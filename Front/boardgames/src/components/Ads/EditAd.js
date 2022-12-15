import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';

export default function EditAd() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [adID, setID] = useState(null);
    const sendDataToAPI = () => {
        axiosPrivate.put('/games/' + `${localStorage.getItem('ID')}` +'/ads/'+`${localStorage.getItem('adID')}`, {
            name,
            description,
            price,
            phone
        }).then(() => {
            navigate("/ads/detailed");
        })
    }

    useEffect(() => {
        setName(localStorage.getItem('adName'));
        setDescription(localStorage.getItem('adDescription'));
        setPrice(localStorage.getItem('adPrice'));
        setPhone(localStorage.getItem('adPhone'));
        setID(localStorage.getItem('adID'))
    }, [])

    return (
        <section>
            <h1>Edit Ad</h1>
            <br></br>
            <Form>
                <Form.Field>
                    <label>Your Name</label>
                    <br></br>
                    <input name="fname"
                        type="text"
                        autoComplete="off"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Your Name' />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <br></br>
                    <input
                        name="lname"
                        type="text"
                        autoComplete="off"
                        required
                        value={description}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <br></br>
                    <input type="number"
                        autoComplete="off"
                        required
                        name="fprice"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price' />
                </Form.Field>
                <Form.Field>
                    <label>Phone</label>
                    <br></br>
                    <input
                        name="lphone"
                        type="text"
                        autoComplete="off"
                        required
                        value={phone}
                        placeholder='Phone'
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Edit</Button>
                <Link to='/ads/detailed'>
                    <Button
                        color="green">
                        Back
                    </Button>
                </Link>
            </Form>
        </section>
    )
}