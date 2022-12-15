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
        navigate("/");
    })
  }
  return (
    <section>
      <h1>Add Game</h1>
      <br></br>
      <Form>
        <Form.Field>
          <label>Game Name</label>
          <br></br>
          <input name="fname" 
          type="text"
          autoComplete="off"
          required
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
          placeholder='Description' 
          onChange={(e) => setDescription(e.target.value)} 
          />
        </Form.Field>
        <Button type='submit' onClick={sendDataToAPI}>Add</Button>
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