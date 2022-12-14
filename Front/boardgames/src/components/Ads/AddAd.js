import React, { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';

export default function AddAd() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [gameID, setGameID] = useState(null);
    useEffect(() => {
    setGameID(localStorage.getItem('ID'))
    }, [])
    const sendDataToAPI = () => {
    axiosPrivate.post('/games/' + `${gameID}` +'/ads', {
        name,
        description,
        price,
        phone
    }).then(() => {
        navigate('/ads');
    })
  }
  return (
    <div>
      <Form>
        <Form.Field>
          <label>Your Name</label>
          <input name="fname" 
          onChange={(e) => setName(e.target.value)} 
          placeholder='Your Name' />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input 
          name="lname" 
          placeholder='Description' 
          onChange={(e) => setDescription(e.target.value)} 
          />
        </Form.Field>
        <Form.Field>
          <label>price</label>
          <input type="number"
          name="fprice" 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder='Price' />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <input 
          name="lphone" 
          placeholder='Phone' 
          onChange={(e) => setPhone(e.target.value)} 
          />
        </Form.Field>
        <Button type='submit' onClick={sendDataToAPI}>Add</Button>
        <Link to={'/ads'}>
            <Button
                color="green">
                Back
            </Button>
        </Link>
      </Form>
    </div>
  )
}