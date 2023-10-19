import './SingUp.scss';
import Wrapper from '../wrapper/Wrapper';
import Img1 from '../../assets/animation_lnk8tp8u.json';
import Lottie from 'lottie-react';
import Img2 from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import validator from 'validator';

const LoginSection = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [fname, setFname] = useState("");
    const [fnmessage, setFnMessage] = useState("");
    const [lname, setLname] = useState("");
    const [lnmessage, setLnMessage] = useState("");
    const [password, setPassword] = useState("");
    const [pasmessage, setPasMessage] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [confmessage, setConfMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [phonemessage, setPhoneMessage] = useState("");

    function checkEmail(event){
        let newEmail = event.target.value;
        setEmail(newEmail);

        if(newEmail === ""){
            setMessage("Email address is required")
        }
        else if(!validator.isEmail(newEmail)){
            setMessage("Please, a valid email address ofijan@gmail.com")
        }
        else {
            setMessage("")
        }
    }

    function checkName(event){
        // console.log(event.target.value);
        let newFname = event.target.value;
        setFname(newFname);

        if(newFname === ""){
            setFnMessage("First Name is required")
        }
        else {
            setFnMessage("")
        }
    }

    function checkLname(event){
        // console.log(event.target.value);
        let newLname = event.target.value;
        setLname(newLname);

        if(newLname === ""){
            setLnMessage("Last Name is required")
        }
        else {
            setLnMessage("")
        }
    }

    function checkPassword(event){
        // console.log(event.target.value);
        let newPname = event.target.value;
        setPassword(newPname);

        if(newPname === ""){
            setPasMessage("Password is required")
        }
        else {
            setPasMessage("")
        }
    }

    function checkConfPassword(event){
        // console.log(event.target.value);
        let newPname = event.target.value;
        setConfPassword(newPname);

        if(newPname !== password){
            setConfMessage("Password not match")
        }
        else {
            setConfMessage("")
        }
    }

    function checkPhoneNumber(event){
        // console.log(event.target.value);
        let newPname = event.target.value;
        setPhone(newPname);

        if(newPname === ""){
            setPhoneMessage("Phone number is required")
        }
        else {
            setPhoneMessage("")
        }
    }

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
                            <form action='singup'>
                                <div className="names">
                                    <div className="fnames">
                                        <label>First Name</label>
                                        <input type="text" placeholder='First Name' className="fname" onBlur={checkName} required/>
                                        <div className="errormessage">{fnmessage}</div> 
                                    </div>
                                    <div className="lnames">
                                        <label>Last Name</label>
                                        <input type="text" placeholder='Last Name' className="lname" onBlur={checkLname} required/>
                                        <div className="errormessage">{lnmessage}</div> 
                                    </div>
                                    
                                </div>
                                <div className="dept_pho">
                                    <div className="emails">
                                        <label>E_mail</label>
                                        <input type="text" placeholder='Email' className="email" onBlur={checkEmail} required/>
                                        <div className="errormessage">{message}</div> 
                                    </div>
                                    <div className="phones">
                                        <label>Phone Number</label>
                                        <input type="tel" placeholder='Phone Number' className="phone" pattern="[0]{1}[9]{1}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" onBlur={checkPhoneNumber} required/>
                                        <div className="errormessage">{phonemessage}</div>
                                    </div>
                                </div>
                                <div className="department">
                                    <label>Department</label>
                                    <select name='department' className='dept' required>
                                        <option className='options'>Computer Science</option>
                                        <option className='options'>Information Science</option>
                                        <option>Information System</option>
                                        <option>Plant Science</option>
                                    </select>
                                </div>
                                <label>Password</label>
                                <input type="password" placeholder='Password' className="pass" onBlur={checkPassword} required/>
                                <div className="errormessage">{pasmessage}</div> 
                                <label>Confirm Password</label>
                                <input type="password" placeholder='Confirm-Password' className="copass" onChange={checkConfPassword} required/>
                                <div className="errormessage">{confmessage}</div> 
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
                            </form>
                        </div>
                </div>
            </div>
        </div>
                
    </Wrapper>
  </section>
  )
}

export default LoginSection