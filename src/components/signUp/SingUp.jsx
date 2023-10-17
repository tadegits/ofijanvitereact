import React from 'react';
import './SingUp.scss';
// import './LoginSection.scss';
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
            <div className="login__form_container1">
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
                <div className="form2">
                    
                        <div className="form-contents1">
                            <label>First Name</label>
                            <input type="text" placeholder='First Name' className="username"/>
                            <label>Last Name</label>
                            <input type="text" placeholder='Last Name' className="username"/>
                            <label>E_mail</label>
                            <input type="text" placeholder='Email' className="username"/>
                            <label>Phone Number</label>
                            <input type="number" placeholder='Phone Number' className="username"/>
                            <label>Department</label>
                            <input type="text" placeholder='Department' className="username"/>
                            <label>Password</label>
                            <input type="password" placeholder='Password' className="password"/>
                            <label>Confirm Password</label>
                            <input type="password" placeholder='Confirm-Password' className="username"/>
                                <div className="summit-forget">
                                    <p>Forgot your password ?</p>
                                </div>
                            <div className="summit-signup">
                                {/* <button className='sigbtn'>Log In</button> */}
                                <input type="submit" value="Log In" className="sigbtn"/>
                            </div> 
                            <div className="summit-signuplog">
                                <h5>Registor as new user</h5> 
                                {/* <button className='signup2'>Sign Up</button> */}
                                <input type='submit' value="Sign Up" className='singup2'/>
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