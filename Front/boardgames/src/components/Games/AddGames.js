import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';
import { useHistory } from 'react-router';

export default function AddGames() {
    const GAMES_URL = '/games';
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
  //let history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const sendDataToAPI = () => {
    axiosPrivate.post(GAMES_URL, {
        name,
        description
    }).then(() => {
        navigate("/games");
    })
  }
  return (
    <div>
      <Form>
        <Form.Field>
          <label>Game Name</label>
          <input name="fname" 
          onChange={(e) => setName(e.target.value)} 
          placeholder='Game Name' />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input 
          name="lname" 
          placeholder='Description' 
          onChange={(e) => setDescription(e.target.value)} 
          />
        </Form.Field>
        <Button type='submit' onClick={sendDataToAPI}>Add</Button>
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