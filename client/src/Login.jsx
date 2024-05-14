import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setErrMsg('');
            await props.validateLogin(username, password);
            navigate('/');
        } catch (err) {
            setErrMsg(err.message);
        }
    }

    // return <Form>
    //     <Form.Group className="mb-3">
    //         <Form.Label>Username</Form.Label>
    //         <Form.Control type='email' placeholder='E-mail' value={username} onChange={(ev)=>{setUsername(ev.target.value)}}/>
    //     </Form.Group>
    //     <Form.Group className="mb-3">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control type='password' placeholder='password' value={password} onChange={(ev)=>{setPassword(ev.target.value)}}/>
    //     </Form.Group >
    //     <Button variant="primary" type="button" onClick={handleSubmit}>Submit</Button>{' '}
    //     <Button variant="secondary" type="button" onClick={()=>{navigate('/')}}>Cancel</Button><br/>
    //     {errMsg}

    // </Form>
    return <Row className="justify-content-center">
        <Col md={6}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='email' placeholder='E-mail' value={username} onChange={(ev) => { setUsername(ev.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' value={password} onChange={(ev) => { setPassword(ev.target.value) }} />
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="button" onClick={handleSubmit}>Submit</Button>{' '}
                    <Button variant="secondary" type="button" onClick={() => { navigate('/') }}>Cancel</Button>
                </div>
                <br />
                {errMsg}
            </Form>
        </Col>
    </Row>


}

export { Login };