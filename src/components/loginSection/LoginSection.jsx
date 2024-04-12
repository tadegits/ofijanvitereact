import React, { useState, useEffect } from 'react';
import Wrapper from '../wrapper/Wrapper';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';
import { Divider } from "antd";
import './LoginSection.scss'

const LoginSection = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();

    useEffect(() => {
        const logedUser = localStorage.getItem("user");
        if (logedUser !== null) {
            navigate('/');
        }
    }, [navigate]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setError("Email and password are required");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            console.log(response.data);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/Exit_Exam');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setError("Incorrect username or password");
            }
        }
    };

    return (
        <section className="login">
            <Wrapper className='login__section'>
                <div className="login__container">
                    <div className="login__form1">
                        <div className="form-contents">
                            {error && <div className="error-message">{error}</div>}
                            <input type="text" placeholder='Email' value={email} onChange={handleEmailChange} className="email" />
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="pass"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="password-toggle"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <div className="summit-login">
                                <button className='logbtn' onClick={handleSubmit}> Log In</button>
                            </div>
                            <Divider><p>Don't Have Account?</p></Divider>
                            <div className="summit-signup">
                                <Link to={'/signup'}><input type='submit' value="Register" className='singup' /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </section>
    )
}

export default LoginSection;
