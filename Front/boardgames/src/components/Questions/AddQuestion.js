import React, { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';

export default function AddQuestion() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [gameID, setGameID] = useState(null);
    const [adID, setAdID] = useState(null);
    useEffect(() => {
    setGameID(localStorage.getItem('ID'))
    }, [])
    const sendDataToAPI = () => {
    axiosPrivate.post('/games/' + `${localStorage.getItem('ID')}` +'/ads/'+`${localStorage.getItem('adID')}` +'/questions', {
        author,
        body
    }).then(() => {
        navigate('/questions');
    })
  }
  return (
    <section>
        <h1>Ask Question</h1>
      <Form>
        <Form.Field>
          <label>Author Name</label>
          <br></br>
          <input name="fname" 
          type="text"
          autoComplete="off"
          required
          onChange={(e) => setAuthor(e.target.value)} 
          placeholder='Author Name' />
        </Form.Field>
        <Form.Field>
          <label>Question</label>
          <br></br>
          <input 
          name="lbody" 
          type="text"
          autoComplete="off"
          required
          placeholder='Question' 
          onChange={(e) => setBody(e.target.value)} 
          />
        </Form.Field>
        <Button type='submit' onClick={sendDataToAPI}>Add</Button>
        <Link to={'/questions'}>
            <Button
                color="green">
                Back
            </Button>
        </Link>
      </Form>
    </section>
  )
}