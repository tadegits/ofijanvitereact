import "./Navbar.scss";
import Wrapper from "../wrapper/Wrapper";
import Logo from "../../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logout } from '../../features/userSlice'
const Navbar = () => {

    const my_user = useSelector(selectUser);
    
    const [user, setUser] = useState(null);
    const [showNav, setShowNav] = useState(false);
    const isLoggedIn = useSelector(selectUser)
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);
console.log(user);
    const handleLogout = () => {

        setLogoutModalVisible(true);
    };

    const handleConfirmLogout = (e) => {
        setLogoutModalVisible(false);
        e.preventDefault();
        localStorage.removeItem("user");
        setUser(null);
        dispatch(logout());
        navigate('/')
    };

    const handleCancelLogout = () => {
        setLogoutModalVisible(false);
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
            <section className="navbarz__container">
                <Link to="/" className="navbarz__logo" onClick={() => setShowNav(false)}>
                    <div className="logo__moto">
                        <h1>OFIJAN </h1>
                    </div>
                </Link>
                <ul className={`navbarz__links ${showNav ? "show-nav" : ""}`}>
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/" title="Go to Home">Home</Link>
                    </li>
                    <li onClick={() => setShowNav(false)}>
                        <Link to={isLoggedIn ? "/Exit_Exam" : "/ExitExam" } title="exams">All Exams</Link>
                    </li>
                    {isLoggedIn &&
                        <li onClick={() => setShowNav(false)}>
                            <a href="/easyexam">Take Exam</a>
                        </li>
                    }
                    <li onClick={() => setShowNav(false)}>
                        <Link  to="/2015_exit_pdfs" title="2015 ethopian Exit Exam">2015 Exit Exam</Link>
                    </li>
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/blueprint" title="Exit exam blue print">Blue Print</Link>
                    </li>
                    <li onClick={() => setShowNav(false)}>
                        <Link to="/ofijan_blogs" title="Ofijan Blog">Blog</Link>
                    </li>
                    {isLoggedIn &&
                        <li onClick={() => setShowNav(false)}>
                            <Link to="/my_results" title="Show my results">My Result</Link>
                        </li>
                    }
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
                    <li>


                        {!isLoggedIn && <div className={`button-sig ${showNav ? "tade-color" : ""}`} onClick={() => setShowNav(!showNav)}>
                            <Link to='/Login' className="button-outline">
                                Sign in
                            </Link>
                        </div>}

                    </li>
                    <li>


                        <div className={`navbarz__menubar ${showNav ? "tade-color" : ""}`} onClick={() => setShowNav(!showNav)}>
                            <FaTimes />
                        </div>

                    </li>
                </ul>
                {!isLoggedIn &&
                    <Link to='/Login' title="Login to ofijan" className="button-primary navbarz__btn">
                        Sign in
                    </Link>
                }

                <div className={`navbarz__menubar ${showNav ? "bg-color" : ""}`} onClick={() => setShowNav(!showNav)}>
                    <FaBars />
                </div>
                <Modal
                    title="Confirm Logout"
                    open={logoutModalVisible}
                    onOk={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                >
                    <p>Are you sure you want to logout?</p>
                </Modal>
            </section>
        </nav>
    );
}

export default Navbar;
