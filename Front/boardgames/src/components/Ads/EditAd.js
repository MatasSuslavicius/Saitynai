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
        <div>
            <Form>
                <Form.Field>
                    <label>Your Name</label>
                    <input name="fname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Your Name' />
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
                <Form.Field>
                    <label>Price</label>
                    <input type="number"
                        name="fprice"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price' />
                </Form.Field>
                <Form.Field>
                    <label>Phone</label>
                    <input
                        name="lphone"
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
        </div>
    )
}