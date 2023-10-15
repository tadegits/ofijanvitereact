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
                <div className="login__image_holder">
                    <div className="logtitle">
                        <img src={Img2} className='img-2'/>
                        <h1>Ofijan</h1>
                    </div>
                    <div className="login__header">
                        <h4>Log in to Ofijan</h4>
                        <p>Continue your study to increase your accivement.</p>
                    </div>
                </div>
                <div className="login__form">
                    <form>
                            <p>Email</p>
                            <input type="text" className="username"/>
                            <p>Password</p>
                            <input type="password" className="password"/>
                            <div className="summit-login">
                                <p>Forgot your password?</p>
                            </div>
                            <div className="summit-login">
                                <input type="submit" value="Log In" className="logbtn"/>
                            </div>
                            <div className="summit-signup">
                                <input type='submit' value="Sign Up"className="button-primary"/>
                            </div>
                    </form>
                </div>
            </div>
        </div>
                
    </Wrapper>
  </section>
  )
}

export default LoginSection