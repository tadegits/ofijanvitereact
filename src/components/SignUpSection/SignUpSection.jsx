import "./SignUpSection.scss";
import Wrapper from "../wrapper/Wrapper";
import React from 'react';
import SignUp from '../../assets/signup.png'
import LoginSection from '../loginSection/LoginSection'
import GoogleLoginButton from "../loginSection/GoogleLoginButton";
export default function SignUpSection() {
  return (
    <section className="signup">
<Wrapper className="signup__container">
<div className="signup_left">
     <img src={SignUp}></img> 
</div>
<div className="signup_right">
    <h3>Join and test what you have studied so far!</h3>
    <p>
        {" "}
        Simple registration will customise your preference! You will have better experinace with ofijan. 
        we are waiting for you with all our best questions to practise with.
    </p>
  <GoogleLoginButton/>
</div>
</Wrapper>
    </section>
    
)
}
