import React, { useState } from 'react'
import axios from 'axios';
import { setUserSession } from '../Components/Common';
import { useNavigate } from 'react-router-dom';
import background from '../images/login-background.jpg'
import './Login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loginbtn = (props) => {
        if (email.trim().length !== 0 && password.trim().length !== 0) {
            setError(null);
            setLoading(true);
            axios.post('https://bbc2-103-141-51-42.in.ngrok.io/api/v1/login', { email: email, password: password })
            .then(response => {
                setLoading(false);
                setUserSession(response.data.refreshtoken, response.data);
                navigate('/profile');
            })
                .catch(error => {
                    setLoading(false);
                    if (error.response === 401) {
                        setError(error.response.data.message);
                    }
                    else setError("User Not Found...");
                });
        }
        else {
            alert("Please Enter a Value")
        }
    }

    return (
        <div style={{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center", minHeight:"100vh",maxWidth:"100%"}}>
            <section className="text-center text-lg-start" >       
               <div className="container py-4">
                    <div className="row g-0 align-items-center">
                    <div className="col-lg-4 col-md-3 mb-4 mt-3 mb-lg-0">
                            
                            </div>
                        <div className="col-lg-4 col-md-6 mb-5 mt-3 mb-lg-0">
                            <div className="card mt-5  cascading-right">
                                <div className="card-body p-5 shadow-5 text-center">
                                    <h2 className="fw-bold mb-5 san text-white ">Sign in now</h2>
                                    <form>
                                        <div className="form-outline mb-3">
                                        <label className="form-label d-flex text-white" htmlFor="form3Example3">Email address:</label>
                                            <input type="email" id="form3Example3" className="form-control" placeholder='Enter a Email' value={email} onChange={e => setEmail(e.target.value)} />
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label className="form-label d-flex text-white" htmlFor="form3Example4" >Password:</label>
                                            <input type="password" id="form3Example4" className="form-control" placeholder='Enter a Password'value={password} onChange={e => setPassword(e.target.value)} />
                                        </div>
                                        {error && <><small style={{ color: 'red' ,fontSize:"18px"}}>{error}</small><br /></>}<br />
                                        
                                        <button type="submit" className="btn btn-primary btn-block mb-4 text-white" onClick={loginbtn}  disabled={loading}>
                                            Sign in
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 mb-5 mb-lg-0">
                            
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login