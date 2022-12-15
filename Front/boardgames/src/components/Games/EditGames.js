import React, { useState, useEffect } from 'react';
import { Form, Button} from 'semantic-ui-react';
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
            navigate("/");
        })
    }

    useEffect(() => {
        setName(localStorage.getItem('name'));
        setDescription(localStorage.getItem('description'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <section>
            <h1>Edit {name}</h1>
            <br></br>
            <Form>
                <Form.Field>
                    <label>Game Name</label>
                    <br></br>
                    <input name="fname"
                        type="text"
                        autoComplete="off"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Game Name' />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <br></br>
                    <input
                        name="lname"
                        type="text"
                        autoComplete="off"
                        value={description}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Edit</Button>
                <Link to='/'>
                    <Button
                        color="green">
                        Back
                    </Button>
                </Link>
            </Form>
        </section>
    )
}