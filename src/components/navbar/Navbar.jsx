import "./Navbar.scss";
import Wrapper from "../wrapper/Wrapper";
import Logo from "../../assets/logo.png";
import {FaBars} from "react-icons/fa";
import {useState} from "react";
import { Link } from "react-router-dom";
const Navbar= () => {
  const[showNav, setShowNav] =useState
  (false);

     return (
    <nav className="navbar">
        <Wrapper className="navbar__container">
     <Link to= "/" className="navbar__logo"
     onClick={() => setShowNav(false)}>
        <img src={Logo} alt=""/>
        
     </Link>
     <ul className={`navbar__links ${showNav ? "show-nav" :"" }`}>
        <li onClick={() => setShowNav(false)}>
           <Link to="/">Home</Link>
        </li>
        <li onClick={() => setShowNav(false)}>
            <Link to="/Grade6">Grade 6<sup>th</sup></Link>
        </li>
        <li onClick={() => setShowNav(false)}>
            <Link to="/Grade8">Grade 8<sup>th</sup></Link>
        </li>
        <li onClick={() => setShowNav(false)}>
        <Link to="/Grade12">Grade 12<sup>th</sup></Link>
           
        </li>
        <li onClick={() => setShowNav(false)}>
        <Link to="/ExitExam">Exit Exam</Link>
        </li>
        <li onClick={() => setShowNav(false)}>
            <a href ="#">About</a>
        </li>
</ul>

<a href="#" className="button-primary 
navbar__btn">
    Sign Up
</a>

<div className={`navbar__menubar ${showNav ? "bg-color": ""}`} 
onClick={()=>setShowNav(!showNav)}
>
    <FaBars />
     </div>
    </Wrapper>
    </nav>
  )
}

export default Navbar
