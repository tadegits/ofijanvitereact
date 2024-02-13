import "./Navbar.scss";
import Wrapper from "../wrapper/Wrapper";
import Logo from "../../assets/withmoto.png";
import { FaBars } from "react-icons/fa";
import { BrowserRouter as Router, Route, Link, Routes, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState, } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const Navbar = () => {
    const [user, setUser] = useState("")
    const [showNav, setShowNav] = useState(false);
    const [showExams, setShowExams] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isLoggedIn, setIsLoggedin] = useState(false);
    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };
    const loggedInUser = localStorage.getItem("user");
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.stringify(loggedInUser);
            setUser(foundUser);
            setIsLoggedin(true);

        }
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';

    };
    return (
        <nav className="navbarz">
            <Wrapper className="navbarz__container">
                <Link to="/" className="navbarz__logo"
                    onClick={() => setShowNav(false)}>
                    <img src={Logo} alt="" />

                </Link>
                <ul className={`navbarz__links ${showNav ? "show-nav" : ""}`}>
                    {isLoggedIn? (<li onClick={() => setShowNav(false)}>
                        <Link to="/your exams">For you</Link> 
                    </li>):( <li onClick={() => setShowNav(false)}>
                        <Link to="/">Home</Link> 
                    </li>)}
                    {/* <li onClick={() => setShowNav(false)}>
                        <Link to="/">Home</Link>
                    </li> */}
                    {isLoggedIn? (<li onClick={() => setShowNav(false)}>
                        <Link to="/Exit_Exam">All Exams</Link> 
                    </li>):( <li onClick={() => setShowNav(false)}>
                        <Link to="/ExitExam">All Exams</Link> 
                    </li>)}
                   
                    {/* <li onClick={() => setShowNav(false)}>
                        <Link to="/CoC">CoC</Link>
                    </li>
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/Grade12">Grade 12<sup>th</sup></Link>

                    </li>
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/Grade8">Grade 8<sup>th</sup></Link>
                    </li>

                    <li onClick={() => setShowNav(false)}>
                        <Link to="/Grade6">Grade 6<sup>th</sup></Link>
                    </li> */}
                    {isLoggedIn? (<li onClick={() => setShowNav(false)}>
                        <a href="/easyexam">Take Exam</a>
                    </li>):
                    (<></>)}

<li onClick={() => setShowNav(false)}>
                        <Link to="/2015_exit_pdfs">2015 Exit Exam</Link> 
                    </li>
                    {/* <li onClick={() => setShowNav(false)}>
                        <Link to="/ofijan_blogs">2015 Exit Exam</Link> 
                    </li> */}
                    {isLoggedIn ?

                        (<li className={`navbarz__menubar ${showNav ? "button-outline" : ""}`}
                            onClick={handleLogout}>
                            Log out
                        </li>)

                        :

                        (<li className={`navbarz__menubar ${showNav ? "button-outline" : ""}`}
                            onClick={handleLogout}>
                            <a href="/Login">Get Started</a>
                        </li>)
                    }

                </ul>
                {isLoggedIn ?
                    (<Link to='#' onClick={handleLogout} className="button-primary navbarz__btn">
                        Log out
                    </Link>) 
                    
                    :

                    (<Link to='/Login' className="button-primary navbarz__btn">
                            Sign in
                        </Link>
                    )}

                <div className={`navbarz__menubar ${showNav ? "bg-color" : ""}`}
                    onClick={() => setShowNav(!showNav)}>
                    <FaBars />
                </div>
            </Wrapper>

        </nav>

    )
}

export default Navbar
