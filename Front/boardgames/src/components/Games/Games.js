import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
//import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

export default function Games() {
    const { auth } = useAuth();
    const GAMES_URL = '/games';
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [gamesData, setGamesData] = useState([]);
    const allowedRoles = (["Admin", ""])
    useEffect(() => {
        axiosPrivate.get(GAMES_URL)
            .then((getData) => {
                setGamesData(getData.data);
            })
    }, [])
    
    const setData = (id, name, description) => {
        localStorage.setItem('ID', id)
        localStorage.setItem('name', name)
        localStorage.setItem('description', description)
    }

    const getData = () => {
        axiosPrivate.get(GAMES_URL)
            .then((getData) => {
                setGamesData(getData.data);
            })
    }

    const onDelete = (id) => {
        axiosPrivate.delete(GAMES_URL+`/${id}`)
        .then(() => {
            getData();
        })
    }
    const styles = {
        table: {
          borderCollapse: "collapse",
          marginLeft: "10vh",
          marginRight: "10vh",
        },
        th: {
          border: "1px solid #333",
          padding: 8,
          fontWeight: "bold",
          textAlign: "left",
          backgroundColor: "rgba(0,0,0,0.1)",
        },
        td: {
          border: "1px solid #333",
          padding: 8,
        },
      };
    return (
        <section2>
            <h1>Games</h1>
            <br></br>
            <Table celled style={styles.table}>
            
                <Table.Header style={styles.th}>
                    <Table.Row style={styles.th}>
                        <Table.HeaderCell style={styles.th}>Name</Table.HeaderCell>
                        <Table.HeaderCell style={styles.th}>Description</Table.HeaderCell>
                        <Table.HeaderCell style={styles.th}>Ads</Table.HeaderCell>
                        {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                        (<Table.HeaderCell style={styles.th}>Edit</Table.HeaderCell>)}
                        {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                        (<Table.HeaderCell style={styles.th}>Delete</Table.HeaderCell>)}
            
                    </Table.Row>
                </Table.Header>

                <Table.Body style={styles.td}>
                    {gamesData.map((data) => {
                        return (
                            <Table.Row style={styles.td}>
                                <Table.Cell style={styles.td}>{data.name}</Table.Cell>
                                <Table.Cell style={styles.td}>{data.description}</Table.Cell>
                                <Table.Cell style={styles.td}>
                                    <Link to='/ads'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.id, data.name, data.description)}>
                                            Open Ads
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                                (<Table.Cell style={styles.td}>
                                    <Link to='/games/edit'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.id, data.name, data.description)}>
                                            Edit
                                        </Button>
                                    </Link>
                                </Table.Cell>)}
                                {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                                (<Table.Cell style={styles.td}>
                                    <Button color="red" onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>)}
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
            <br></br>
            {auth?.roles?.find(role => allowedRoles?.includes(role)) 
            && 
            (<Link to='/games/add'>
                <Button
                    color="blue">
                    Add game
                </Button>
            </Link>)}
        </section2>
    )
}