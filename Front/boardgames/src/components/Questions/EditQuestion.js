import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link ,useNavigate} from 'react-router-dom';

export default function EditQuestion() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [adID, setID] = useState(null);
    const sendDataToAPI = () => {
        axiosPrivate.put('/games/' + `${localStorage.getItem('ID')}` +'/ads/'+`${localStorage.getItem('adID')}`+'/questions/'+`${localStorage.getItem('questionID')}`, {
            author,
            body
        }).then(() => {
            navigate("/questions/detailed");
        })
    }

    useEffect(() => {
        setAuthor(localStorage.getItem('questionAuthor'));
        setBody(localStorage.getItem('questionBody'));
        setID(localStorage.getItem('adID'))
    }, [])

    return (
        <section>
            <h1>Edit Question</h1>
            <br></br>
            <Form>
                <Form.Field>
                    <label>Author Name</label>
                    <br></br>
                    <input name="fname"
                        type="text"
                        autoComplete="off"
                        required
                        value={author}
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
                        value={body}
                        placeholder='Question'
                        onChange={(e) => setBody(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Edit</Button>
                <Link to='/questions/detailed'>
                    <Button
                        color="green">
                        Back
                    </Button>
                </Link>
            </Form>
        </section>
    )
}