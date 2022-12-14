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

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Ads</Table.HeaderCell>
                        {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                        (<Table.HeaderCell>Edit</Table.HeaderCell>)}
                        {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                        (<Table.HeaderCell>Delete</Table.HeaderCell>)}
            
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {gamesData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.description}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/ads'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.id, data.name, data.description)}>
                                            Open Ads
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                                (<Table.Cell>
                                    <Link to='edit'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.id, data.name, data.description)}>
                                            Edit
                                        </Button>
                                    </Link>
                                </Table.Cell>)}
                                {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                                (<Table.Cell>
                                    <Button color="red" onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>)}
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
            {auth?.roles?.find(role => allowedRoles?.includes(role)) 
            && 
            (<Link to='add'>
                <Button
                    color="blue">
                    Add game
                </Button>
            </Link>)}
        </div>
    )
}