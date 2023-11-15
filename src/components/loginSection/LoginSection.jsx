import React, { useState, useEffect } from 'react';
import './LoginSection.scss';
import Wrapper from '../wrapper/Wrapper';
import Img1 from '../../assets/animation_lnk8tp8u.json';
import Lottie from 'lottie-react';
import Img2 from '../../assets/logo.png';
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Seller from '../../Seller';
import SellerMain from '../../Seller/pages/SellerMain/SellerMain';

const LoginSection = () => {
    const [email, setEmail] = useState("");
    const [emailMess, setEmailMess] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMess, setPasswordMess] = useState("");
    const [user, setUser] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [registered, setRegistered] = useState("");
    const [role, setRole] = useState("");
    const [stat, setStat] = useState("");
    const [statMess, setStatMess] = useState("");
    const navigate = useNavigate();
    const state = useLocation();
    let userdone, sellarinfor, roles = "";

    if (state.state !== null) {

        const name = state.state.name;
        const registereduser = state.state.registered;
        // const registereduser = state;
        // setRegistered({state})
        if (registereduser !== undefined) {
            userdone = registereduser.respresult;
        }
        else {
            userdone = userdone;
        }

        if (name !== undefined) {
            sellarinfor = name;
        }
        else {
            sellarinfor = sellarinfor;
        }
        // console.log(state);
        // console.log(sellarinfor);
    }

    function checkemail(e) {
        const emails = e.target.value;
        // console.log(emails);
        setEmail(emails);
    }

    function checkpassword(e) {
        const passwords = e.target.value;
        setPassword(passwords);
    }

    // console.log(isLoggedin);
    // console.log(localStorage.getItem('user'));
    // if (localStorage.getItem('user') !== null) {
    //     setIsLoggedin(true);
    // }

    useEffect(() => {
        const logedUser = localStorage.getItem("user");
        if (logedUser !== null) {
            setIsLoggedin(true)
        }
        if (isLoggedin === true) {
            const userLoged = JSON.parse(logedUser);
            setRole(userLoged.user.role_id);
        }
    })

    console.log(role);

    if (role === 2 || role === 3) {
        navigate('/teacher')
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (email === "") {
            setEmailMess("Email or username required!");
        }
        else if (password === "") {
            setEmailMess("Password is required!");
        }
        else {
            const user = { email, password };
            // send the username and password to the server
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                user
            ).then(response => {
                console.log(response);
                roles = JSON.stringify(response.data.user.role_id);
                setUser(response.data)
                console.log("check", response);
                // set the state of the user
                // setUser(response.data)
                if (response.data) {
                    if (role == 3) {
                        // navigate('/teacher');
                        window.location.href = '/teacher';
                    }
                    else {
                        window.location.href = '/seller';
                    }

                }
                setIsLoggedin(true);
                // store the user in localStorage
                localStorage.setItem('user', JSON.stringify(response.data))
            }).catch(response => {
                console.log(response.response.status);
                setStat(response.response.status);
                console.log("hjghghghghg", stat);
                if (stat === 422) {
                    setStatMess("Error username or password");
                    // setStatMess("", 30000);
                }
                else {
                    setStatMess("");
                }
                // console.log(response.data.message);
            });
            // const role = JSON.stringify(response.data.user.role_id);
        }
    };
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.stringify(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    <Routes>
        <Route path="/teacher" element={<Seller />} />
    </Routes>
    //login without axios
    // async function login() {
    //     console.warn(email, password);
    //     let item = { email, password };
    //     let result = await fetch("http://127.0.0.1:8000/api/login", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": 'application/json'
    //         },
    //         body: JSON.stringify(item)
    //     });
    //     console.log(result);
    //     result = await result.json();
    //     localStorage.setItem("user-info", JSON.stringify(result))
    //     navigate('/dashboard');
    // }

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
                                <div className='registered'>{userdone}</div>
                                <p className='infos'>Continue your study to increase your achivement.</p>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="login__form1">
                            <div className="form-contents">
                                <div className="errormessage">{statMess}</div>
                                <input type="text" placeholder='Email'
                                    onChange={checkemail}
                                    className="email" />
                                <div className="errormessage">{emailMess}</div>
                                <input type="password" placeholder='Password'
                                    onChange={checkpassword}
                                    className="pass" />
                                <div className="errormessage">{passwordMess}</div>
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