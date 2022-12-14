import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';

export default function EditGames() {
    const GAMES_URL = '/games';
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axiosPrivate.put(GAMES_URL+`/${ID}`, {
            name,
            description
        }).then(() => {
            navigate("/games");
        })
    }

    useEffect(() => {
        setName(localStorage.getItem('name'));
        setDescription(localStorage.getItem('description'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Game Name</label>
                    <input name="fname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Game Name' />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input
                        name="lname"
                        value={description}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Edit</Button>
                <Link to='/games'>
                    <Button
                        color="green">
                        Back
                    </Button>
                </Link>
            </Form>
        </div>
    )
}