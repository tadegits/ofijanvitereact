import React from 'react';
import './SingUp.scss';
// import './LoginSection.scss';
import Wrapper from '../wrapper/Wrapper';
import Img1 from '../../assets/animation_lnk8tp8u.json';
import Lottie from 'lottie-react';
import Img2 from '../../assets/logo.png';
import { Link } from 'react-router-dom';

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
            <div className="login__form_container1">
                <div className="login__image_holder2">
                    <div className="logtitle">
                        <img src={Img2} className='img-2'/>
                        <h1>Ofijan</h1>
                    </div>
                    <div className="login__header">
                        <h4>Create your Ofijan Account</h4>
                        <p>Continue your study to increase your achivement.</p>
                    </div>
                    <hr></hr>
                </div>
                <div className="form2">
                    
                        <div className="form-contents1">
                            <div className="names">
                                <div className="fnames">
                                    <label>First Name</label>
                                    <input type="text" placeholder='First Name' className="fname"/>
                                </div>
                                <div className="lnames">
                                    <label>Last Name</label>
                                    <input type="text" placeholder='Last Name' className="lname"/>
                                </div>
                                
                            </div>
                            <div className="dept_pho">
                                <div className="emails">
                                    <label>E_mail</label>
                                    <input type="text" placeholder='Email' className="email"/>
                                </div>
                                <div className="phones">
                                    <label>Phone Number</label>
                                    <input type="tel" placeholder='Phone Number' className="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
                                </div>
                            </div>
                            
                            <label>Department</label>
                            <input type="text" placeholder='Department' className="dept"/>
                            <label>Password</label>
                            <input type="password" placeholder='Password' className="pass"/>
                            <label>Confirm Password</label>
                            <input type="password" placeholder='Confirm-Password' className="copass"/>
                                {/* <div className="summit-forget">
                                    <p>Forgot your password ?</p>
                                </div> */}
                            <div className="summit-signup">
                                <button className='sigbtn'>Sing Up</button>
                                {/* <input type="submit" value="Log In" className="sigbtn"/> */}
                            </div> 
                            <div className="summit-signuplog">
                                <h5 className="mes">Already have an account? </h5> 
                                <Link to={'/login'} ><input type='submit' value="Sign In" className='singup2'/></Link>
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