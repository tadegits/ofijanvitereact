import "./Navbar.scss";
import Wrapper from "../wrapper/Wrapper";
import Logo from "../../assets/logo.png";
import {FaBars} from "react-icons/fa";
import {useState} from "react";

const Navbar= () => {
  const[showNav, setShowNav] =useState
  (false);

     return (
    <nav className="navbar">
        <Wrapper className="navbar__container">
     <a href = "#" className="navbar__logo"
     onClick={() => setShowNav(false)}>
        <img src={Logo} alt=""/>
        
     </a>
     <ul className={`navbar__links ${showNav ? "show-nav" :"" }`}>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">Home</a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">Grade 6th</a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">Grade 8th</a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">Grade 12</a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">Exit Exam</a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">about</a>
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
