import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import anim from '../../assets/aguytakingexam.json';
import Lottie from 'lottie-react';
import API_BASE_URL from '../../Globals/apiConfig';
import { Helmet } from 'react-helmet';
import './Hero.scss';
import DepartmentList from '../Department/DepartmentList';
import ExitExam from '../ExitExam/ExitExam';
import Service from '../Service/Service'

const Hero = () => {
  const [text, setText] = useState('Test Your Limit');
  const [role, setRole] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const url = `${API_BASE_URL}/departments`;
  const [loading, setLoading] = useState(true);
  const [deptData, setDeptData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(url);
        const data = await response1.json();
        console.log('the data', data);
        setDeptData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Make sure to set loading to false in case of error too
      }
    };

    fetchData(); // Call fetchData function here, outside the async function

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the text after 20 seconds
      setText('A Place to Confirm Your Study');
    }, 20000);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser !== null) {
      setIsLoggedin(true);
      const userLogged = JSON.parse(loggedUser);
      setRole(userLogged.user.role_id);
    }
  }, []);

  return (
    <section className="hero">
      <Helmet>
         <title>Home</title>
      <meta property="og:title" content="home" />
      <meta property="og:description" content="Ofijan: Your Ultimate Online Exam Bank for Ethiopia's National Exit Exams!" />
      <meta property="og:image" content="withmoto.png" />
      <meta property="og:url" content="https://ofijan.com" />
      </Helmet>
     
      <Wrapper className="hero__container">
        <div className="hero__left">
          <div className="hero__text-container">
            <h1>{text}</h1>
            <p>
              We have gathered more than 4000+ Exit Exam Questions For You!
            </p>
          </div>

          <div className="hero__btn-container">
            {!isLoggedin && (
              <Link to="/ExitExam" className="button-outline btn_hero ">
                Select Your Field Of Study
              </Link>
            )}

            {/* <Link
              to={isLoggedin ? '/easyexam' : '/Login'}
              state={{ name: 'seller' }}
              className="button-outline"
            >
              Take Exam now
            </Link> */}
          </div>
        </div>

        <div className="hero__right">
          <Lottie animationData={anim} className="animation" />
        </div>

      </Wrapper>
      <Service />
      {/* <div className='hero__container hero__left hero__text-container hero__depts'><h6>Departments</h6></div> */}
      {/* <ExitExam/> */}
      {/* <DepartmentList departments={deptData}/>  */}
    </section>
  );
};

export default Hero;
