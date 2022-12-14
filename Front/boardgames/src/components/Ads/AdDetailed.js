import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

export default function AdDetailed() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [adData, setAdData] = useState([]);
    const [gameID, setGameID] = useState(null);
    const [adID, setAdID] = useState(null);
    const [gameName, setGameName] = useState('');
    const allowedRoles = (["Admin", ""])
    useEffect(() => {
        setGameID(localStorage.getItem('ID'))
        setGameName(localStorage.getItem('name'))
        setAdID(localStorage.getItem('adID'))
        axiosPrivate.get('/games/' + `${localStorage.getItem('ID')}` +'/ads/' + `${localStorage.getItem('adID')}`)
            .then((getData) => {
                setAdData(getData.data);
            })
    }, [])
    
    const setData = (adData) => {
        localStorage.setItem('adID', adData.id)
        localStorage.setItem('adName', adData.name)
        localStorage.setItem('adDescription', adData.description)
        localStorage.setItem('adPrice', adData.price)
        localStorage.setItem('adPhone', adData.phone)
    }

    const getData = () => {
        axiosPrivate.get('/games/' + `${localStorage.getItem('ID')}` +'/ads/' + `${localStorage.getItem('adID')}`)
            .then((getData) => {
                console.log(getData.data);
                setAdData(getData.data);
            })
    }

    const onDelete = (id) => {
        axiosPrivate.delete('/games/' + `${localStorage.getItem('ID')}` +'/ads/'+`${localStorage.getItem('adID')}`)
        .then(() => {
            navigate('/ads');
        })
    }

    return (
        <div>
            <h1> {gameName} Ad details</h1>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
            
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                            <Table.Row>
                                <Table.Cell>{adData.id}</Table.Cell>
                                <Table.Cell>{adData.name}</Table.Cell>
                                <Table.Cell>{adData.description}</Table.Cell>
                                <Table.Cell>{adData.price}</Table.Cell>
                                <Table.Cell>{adData.phone}</Table.Cell>
                                
                                
                            </Table.Row>

                </Table.Body>
                <Table.Row>
                        <Table.Cell>
                            <Link to='/questions'>
                                <Button
                                    color="green">
                                    Questions
                                </Button>
                            </Link>
                        </Table.Cell>
                    {auth?.roles?.find(role => allowedRoles?.includes(role)) && 
                        (<Table.Cell>
                            <Link to='/ads/edit'>
                                <Button
                                    color="green"
                                    onClick={() => setData(adData)}>
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
            
            <Link to={'/ads'}>
                <Button
                    color="blue">
                    Back
                </Button>
            </Link>
        </div>
    )
}