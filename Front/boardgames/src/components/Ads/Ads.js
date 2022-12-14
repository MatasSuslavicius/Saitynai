import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

export default function Ads() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [adsData, setAdsData] = useState([]);
    const [gameID, setGameID] = useState(null);
    const [gameName, setGameName] = useState('');
    const allowedRoles = (["SimpleUser", ""])
    useEffect(() => {
        setGameID(localStorage.getItem('ID'))
        setGameName(localStorage.getItem('name'))
        axiosPrivate.get('/games/' + `${localStorage.getItem('ID')}` +'/ads')
            .then((getData) => {
                setAdsData(getData.data);
            })
    }, [])
    
    const setData = (id) => {
        localStorage.setItem('adID', id)
        //localStorage.setItem('name', name)
        //localStorage.setItem('description', description)
        //localStorage.setItem('price', price)
        //localStorage.setItem('phone', phone)
    }

    const getData = () => {
        axiosPrivate.get('/games/' + `${localStorage.getItem('ID')}` +'/ads')
            .then((getData) => {
                console.log(getData.data);
                setAdsData(getData.data);
            })
    }

    const onDelete = (id) => {
        axiosPrivate.delete('/games/' + `${localStorage.getItem('ID')}` +'/ads'+`/${id}`)
        .then(() => {
            getData();
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
            <h1> {gameName} Ads</h1>
            <br></br>
            <Table celled style={styles.table}>
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell style={styles.th}>Price</Table.HeaderCell >

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {adsData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell style={styles.td}>{data.price}</Table.Cell>
                                <Table.Cell style={styles.tr}>
                                    <Link to='detailed'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.id)}>
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
            {auth?.roles?.find(role => allowedRoles?.includes(role)) 
            && 
            (<Link to='add'>
                <Button
                    color="blue">
                    Create Ad
                </Button>
            </Link>)}
            <Link to={'/'}>
                <Button
                    color="blue">
                    Back
                </Button>
            </Link>
        </section2>
    )
}