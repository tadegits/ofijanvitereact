import React from 'react';
import './LoginSection.scss';
import Wrapper from '../wrapper/Wrapper';
import Img1 from '../../assets/animation_lnk8tp8u.json';
import Lottie from 'lottie-react';
import Img2 from '../../assets/logo.png';

const LoginSection = () => {
  return (
  <section className="login">
    <Wrapper>
        <div className="login__container">
            <div className="login__image_holder">
                <div>
                    <Lottie animationData={Img1} className='img-1'/>
                </div>
            </div>
            <div className="login__form_container">
                <div className="login__image_holder2">
                    <div className="logtitle">
                        <img src={Img2} className='img-2'/>
                        <h1>Ofijan</h1>
                    </div>
                    <div className="login__header">
                        <h4>Log in to Ofijan</h4>
                        <p>Continue your study to increase your achivement.</p>
                    </div>
                    <hr></hr>
                </div>
                <div className="login__form1">
                    
                        <div className="form-contents">
                            <input type="text" placeholder='Email' className="username"/>
                            <input type="password" placeholder='Password' className="password"/>
                            <div className="summit-forget">
                                <p>Forgot your password ?</p>
                            </div>
                            <div className="summit-login">
                                <input type="submit" value="Log In" className="logbtn"/>
                            </div>
                            <div className="summit-signup">
                                <h5>Registor as new user</h5> <input type='submit' value="Sign Up" className='singup'/>
                            </div>
                        </div>

                        <div className="form-contents1">
                            <label>First Name</label>
                            <input type="text" placeholder='First Name' className="fname"/>
                            <label>Last Name</label>
                            <input type="text" placeholder='Last Name' className="lname"/>
                            <label>E_mail</label>
                            <input type="text" placeholder='Email' className="email"/>
                            <label>Phone Number</label>
                            <input type="text" placeholder='Phone Number' className="phone"/>
                            <label>Password</label>
                            <input type="password" placeholder='Password' className="password"/>
                            <label>Confirm Password</label>
                            <input type="password" placeholder='Confirm-Password' className="confirmpass"/>
                            <div className="summit-forget">
                                <p>Forgot your password ?</p>
                            </div>
                            <div className="summit-login">
                                <input type="submit" value="Log In" className="logbtn"/>
                            </div>
                            <div className="summit-signup">
                                <h5>Registor as new user</h5> <input type='submit' value="Sign Up" className='singup'/>
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