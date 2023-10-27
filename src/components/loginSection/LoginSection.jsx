import React, { useState, useEffect } from 'react';
import './LoginSection.scss';
import Wrapper from '../wrapper/Wrapper';
import Img1 from '../../assets/animation_lnk8tp8u.json';
import Lottie from 'lottie-react';
import Img2 from '../../assets/logo.png';
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Seller from '../../Seller'

const LoginSection = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [registered, setRegistered] = useState("");
    const navigate = useNavigate();
    const {state} = useLocation();
    // setRegistered({state})

    console.log({state});

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { email, password };
        // send the username and password to the server
        const response = await axios.post(
            "http://127.0.0.1:8000/api/login",
            user
        );
        const role = JSON.stringify(response.data.user.role_id);
       
        // set the state of the user
        setUser(response.data)
        if (response.data) {
          if(role == 3)
          {
            window.location.href = '/teacher';
          }
          else{
            window.location.href = '/dashboard';
          }

        }
        setIsLoggedin(true);
        // store the user in localStorage
        localStorage.setItem('user', JSON.stringify(response.data))
        
    };
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.stringify(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    <Routes>
          <Route path="/teacher" element={<Seller/>} />
    </Routes>
    //login without axios
    async function login() {
        console.warn(email, password);
        let item = { email, password };
        let result = await fetch("http://127.0.0.1:8000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        });
        console.log(result);
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
        navigate('/dashboard');

    }

    function refreshPage() {
        window.location.reload(false);
    }
    return (
        <section className="login">
            <Wrapper>
                <div className="login__container">
                    <div className="login__image_holder">
                        <div>
                            <Lottie animationData={Img1} className='img-1' />
                        </div>
                    </div>
                    <div className="login__form_container">
                        <div className="login__image_holder2">
                            <div className="logtitle">
                                <img src={Img2} className='img-2' />
                                <h1>Ofijan</h1>
                            </div>
                            <div className="login__header">
                                <div className='registered'>{state}</div>
                                <p className='infos'>Continue your study to increase your achivement.</p>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="login__form1">

                            <div className="form-contents">
                                <input type="text" placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="email" />
                                <input type="password" placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pass" />
                                <div className="summit-forget">
                                    <p>Forgot your password ?</p>
                                </div>
                                <div className="summit-login">
                                    <button className='logbtn' onClick={handleSubmit}> Log In</button>
                                    {/* <input type="submit" value="Log In"
                                        onClick={handleSubmit}
                                        className="logbtn" /> */}
                                </div>
                                <div className="summit-signup">
                                    <h5>Register as new user</h5> <Link to={'/signup'}><input type='submit' value="Sign Up" className='singup' /></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Wrapper>
        </section>
    )
}

export default LoginSection