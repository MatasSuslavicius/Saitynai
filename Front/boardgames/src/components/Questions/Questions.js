import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

export default function Questions() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [questionsData, setQuestionsData] = useState([]);
    const [gameID, setGameID] = useState(null);
    const [adID, setAdID] = useState(null);
    const [gameName, setGameName] = useState('');
    const allowedRoles = (["Admin", ""])
    useEffect(() => {
        setGameID(localStorage.getItem('ID'))
        setAdID(localStorage.getItem('adID'))
        setGameName(localStorage.getItem('name'))
        axiosPrivate.get('/games/' + `${localStorage.getItem('ID')}` +'/ads/'+`${localStorage.getItem('adID')}` +'/questions')
            .then((getData) => {
                setQuestionsData(getData.data);
            })
    }, [])
    
    const setData = (data) => {
        localStorage.setItem('questionID', data.id)
        localStorage.setItem('questionAuthor', data.author)
        localStorage.setItem('questionBody', data.body)
        //localStorage.setItem('price', price)
        //localStorage.setItem('phone', phone)
    }

    const getData = () => {
        axiosPrivate.get('/games/' + `${localStorage.getItem('ID')}` +'/ads/'+`${localStorage.getItem('adID')}` +'/questions')
            .then((getData) => {
                console.log(getData.data);
                setQuestionsData(getData.data);
            })
    }
    const styles = {
        table: {
          borderCollapse: "collapse",
          marginLeft: "10vh",
          marginRight: "10vh",
          alignSelf: "center",
        },
        th: {
          border: "1px solid #333",
          padding: 8,
          fontWeight: "bold",
          textAlign: "left",
          backgroundColor: "rgba(0,0,0,0.3)",
        },
        td: {
          border: "1px solid #333",
          padding: 8,
          width: "150px"
        },
        tr: {
            textAlign: "left",
          },
      };
    return (
        <section2>
            <h1> {gameName} Ad's Questions</h1>
            <br></br>
            <Table celled style={styles.table}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={styles.th}>ID</Table.HeaderCell>
                        <Table.HeaderCell style={styles.th}>Author</Table.HeaderCell>
                        <Table.HeaderCell style={styles.th}>Question</Table.HeaderCell>
            
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {questionsData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell style={styles.td}>{data.id}</Table.Cell>
                                <Table.Cell style={styles.td}>{data.author}</Table.Cell>
                                <Table.Cell style={styles.td}>{data.body}</Table.Cell>
                                <Table.Cell style={styles.tr}>
                                    <Link to='detailed'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data)}>
                                            Details
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
            <br></br>
            <Link to='add'>
                <Button
                    color="blue">
                    Create Question
                </Button>
            </Link>
            <Link to={'/ads/detailed'}>
                <Button
                    color="blue">
                    Back
                </Button>
            </Link>
        </section2>
    )
}