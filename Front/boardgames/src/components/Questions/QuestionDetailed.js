import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

export default function QuestionDetailed() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [questionData, setQuestionData] = useState([]);
    const [gameID, setGameID] = useState(null);
    const [adID, setAdID] = useState(null);
    const [questionID, setQuestionID] = useState(null);
    const [gameName, setGameName] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const allowedRoles = (["Admin", ""])
    useEffect(() => {
        setGameID(localStorage.getItem('ID'))
        setGameName(localStorage.getItem('name'))
        setAdID(localStorage.getItem('adID'))
        setQuestionID(localStorage.getItem('questionID'))
        setAuthor(localStorage.getItem('questionAuthor'))
        setBody(localStorage.getItem('questionBody'))
        axiosPrivate.get('/games/' + `${localStorage.getItem('ID')}` +'/ads/' + `${localStorage.getItem('adID')}`+'/questions/' + `${localStorage.getItem('questionID')}`)
            .then((getData) => {
                setQuestionData(getData.data);
            })
    }, [])
    
    const onDelete = (id) => {
        axiosPrivate.delete('/games/' + `${localStorage.getItem('ID')}` +'/ads/'+`${localStorage.getItem('adID')}` + '/questions/'+`${localStorage.getItem('questionID')}`)
        .then(() => {
            navigate('/questions');
        })
    }
    const setData = (questionData) => {
        localStorage.setItem('questionID', questionData.id)
        localStorage.setItem('questionAuthor', questionData.author)
        localStorage.setItem('questionBody', questionData.body)
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
      };
    return (
        <section2>
            <h1> Details</h1>
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
                            <Table.Row>
                                <Table.Cell style={styles.td}>{questionData.id}</Table.Cell>
                                <Table.Cell style={styles.td}>{questionData.author}</Table.Cell>
                                <Table.Cell style={styles.td}>{questionData.body}</Table.Cell>
                                
                                
                            </Table.Row>

                </Table.Body>
                <Table.Row>
                    {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                        (<Table.Cell>
                            <Link to='/questions/edit'>
                                <Button
                                    color="green"
                                    onClick={() => setData(questionData)}>
                                    Edit
                                </Button>
                            </Link>
                        </Table.Cell>)}
                        {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                        (<Table.Cell>
                            <Button color="red" onClick={() => onDelete()}>Delete</Button>
                        </Table.Cell>)}
                </Table.Row>
                <Table.Body>
                </Table.Body>
            </Table>
            <br></br>
            <Link to={'/questions'}>
                <Button
                    color="blue">
                    Back
                </Button>
            </Link>
        </section2>
    )
}