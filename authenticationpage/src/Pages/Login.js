import React,{useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { setUserSession } from '../Components/Common';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const loginbtn=()=>{
    if(email.trim().length !==0 && password.trim().length !==0){
        setError(null);
    setLoading(true);
    axios.post('https://1a0d-103-141-51-42.in.ngrok.io/api/v1/login', { email: email, password: password }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data);
      navigate('/profile');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
    }
    else{
        alert("Please Enter a Value")
    }
}

    return (
        <div>
            <h1>Login Page</h1>
            <Container>
                <card>
<Row>
<Col></Col>
    <Col>
    <label>Email</label>
    </Col>
    <Col></Col>
</Row>
<Row>
<Col></Col>
    <Col>
    <input  className='form-control' type='email' placeholder='Enter a Email' value={email} onChange={e=>setEmail(e.target.value)} ></input>
    </Col>
    <Col></Col>
</Row>
<Row>
<Col></Col>
    <Col>
    <label>Password</label>
    </Col>
<Col></Col>
</Row>
<Row>
<Col></Col>
    <Col>
    <input type='password' placeholder='Enter a Password' className='form-control' value={password} onChange={e=>setPassword(e.target.value)} ></input>
    </Col>
<Col></Col>
</Row>
{error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
<Row>
<Col></Col>
    <Col>
    <button className='btn btn-success m-3 w-50' onClick={loginbtn} disabled={loading}>Login</button>
    </Col>
<Col></Col>
</Row>
                </card>
            </Container>

        </div>
    )
}

export default Login