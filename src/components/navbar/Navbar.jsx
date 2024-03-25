import "./Navbar.scss";
import Wrapper from "../wrapper/Wrapper";
import Logo from "../../assets/logo.png";
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

const Navbar = () => {

    const [user, setUser] = useState(null);
    const [showNav, setShowNav] = useState(false);
    const isLoggedIn = !!user;

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = '/';
    };

    const menu = (
        <Menu>
            {isLoggedIn ? (
                <>
                    <Menu.Item key="edit-profile">
                        <Link to="/edit-profile">Edit Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
                </>
            ) : (
                <Menu.Item key="get-started">
                    <Link to="/Login">Get Started</Link>
                </Menu.Item>
            )}
        </Menu>
    );

    return (
        <nav className="navbarz">
            <Wrapper className="navbarz__container">
                <Link to="/" className="navbarz__logo" onClick={() => setShowNav(false)}>
                    {/* <img  src={Logo} alt="Logo" /> */}
                    <div className="logo__moto">
                        <h1>OFIJAN </h1>
                        {/* <p>Test Your limit!</p> */}
                        </div> 
                </Link>
                <ul className={`navbarz__links ${showNav ? "show-nav" : ""}`}>
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/">Home</Link>
                    </li>
                    
                    {isLoggedIn? (<li onClick={() => setShowNav(false)}>
                        <Link to="/Exit_Exam">All Exams</Link>
                    </li>):(<li onClick={() => setShowNav(false)}>
                        <Link to="/ExitExam">All Exams</Link>
                    </li>)
                    }
                    {isLoggedIn &&
                        <li onClick={() => setShowNav(false)}>
                            <a href="/easyexam">Take Exam</a>
                        </li>
                    }
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/2015_exit_pdfs">2015 Exit Exam</Link>
                    </li>
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/blueprint">Blue Print</Link>
                    </li>
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/ofijan_blogs">Blog</Link>
                    </li>
                    {isLoggedIn && <li onClick={() => setShowNav(false)}>
                        <Link to="/my_results">My Result</Link>
                    </li> }
                    
                    <li onClick={() => setShowNav(false)}>
                        <Link to="#">                              </Link>
                    </li>
                    {isLoggedIn &&
                    
                        <li>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Avatar icon={<UserOutlined />} />
                            </Dropdown>
                        </li>
                    }
                </ul>
                {!isLoggedIn &&
                    <Link to='/Login' className="button-primary navbarz__btn">
                        Sign in
                    </Link>
                }
                <div className={`navbarz__menubar ${showNav ? "bg-color" : ""}`} onClick={() => setShowNav(!showNav)}>
                    <FaBars />
                </div>
            </Wrapper>
        </nav>
    )
}

export default Navbar;
