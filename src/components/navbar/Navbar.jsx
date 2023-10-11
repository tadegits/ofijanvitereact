import "./Navbar.scss";
import Wrapper from "../wrapper/Wrapper";
import Logo from "../../assets/logo.png";

//import {FaBars} from "react-icons/fa";
import {useState} from "react";
const Navbar= () => {
  const[showNav, setShowNav] =useState(false);

    return (
    <nav>
        dsssssssss
        <Wrapper className="navbar_container">
     <a href = "#" className="navbar_logo"
     onClick={() => setShowNav(false)}>
        <img src={Logo}alt=""/>
     </a>
     <ul className={'navbar__links ${showNav ? "show-nav" :"" }'}>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">Home</a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">About</a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#"></a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">Home</a>
        </li>
        <li onClick={() => setShowNav(flase)}>
            <a href ="#">Home</a>
        </li>
</ul>

<a href="#" className="button-primary navbar__btn">
    Sign Up
</a>

<div className={'navbar__menubar ${showNav ? "bg-color": "" }'} 
onClick={()=>setShowNav(!showNav)}>
     </div>
    </Wrapper>
    </nav>
  )
}

export default Navbar
