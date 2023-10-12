import "./SignUpSection.scss";
import Wrapper from "../wrapper/Wrapper";
import React from 'react';
import Phone from '../../assets/sun3.png'

export default function SignUpSection() {
  return (
    <section className="signup">
<Wrapper className="signup__container">
<div className="signup_left">
     <img src={Phone}></img> 
</div>
<div className="signup_right">
    <h3>Join to test yourself!</h3>
    <p>
        {" "}
        Simple registration will customise your preference! You will have better experinace with ofijan.
    </p>
    <form>
        <input 
        type="email"
        placeholder="Enter your Email"
        className="Email"/>
        <input type="submit"
        value="submit"
        className="button-primary"/>
    </form>
</div>
</Wrapper>
    </section>
    
)
}
