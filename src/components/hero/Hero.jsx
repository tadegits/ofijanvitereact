import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import anim from '../../assets/aguytakingexam.json';
import Lottie from 'lottie-react';
import API_BASE_URL from '../../Globals/apiConfig';
import { Helmet } from 'react-helmet';
import './Hero.scss';
import Service from '../Service/Service';
import Pdf from '../Pdf';
import ExitExam from "../ExitExam/ExitExam";
const Hero = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const url = `${API_BASE_URL}/departments`;
  const [loading, setLoading] = useState(true);
  const [deptData, setDeptData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched department data:', data);
        setDeptData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setIsLoggedin(true);
    }
  }, []);

  return (
    <section className="hero">
      <Helmet>
        <title>Home - Ofijan</title>
        <meta property="og:title" content="Ofijan - Your Ultimate Online Exam Bank" />
        <meta property="og:description" content="Explore over 10,000 exit exam questions tailored for Ethiopia's national exit exams. Enhance your preparation today!" />
        <meta property="og:image" content="/withmoto.png" />
        <meta property="og:url" content="https://ofijan.com" />
        <meta name="keywords" content="Ofijan, online exam bank, exit exams, Ethiopia, exam preparation" />
        <meta name="description" content="Ofijan provides a comprehensive platform with thousands of exam questions to help you ace your national exit exams in Ethiopia." />
      </Helmet>

      <Wrapper className="hero__container">
        <div className="hero__left">
          <div className="hero__text-container">
            <h1>Test your Limit!</h1>
            <h2>Get ready for your exit exam with OFIJAN.</h2>
            <p>
              We offer over <b><u>10,000</u><sup>+</sup></b> exit exam questions to help you excel in your studies and prepare effectively for your future. Join thousands of successful students who trust Ofijan!
            </p>
           
          </div>

          <div className="hero__btn-container">
            <Link to="/ExitExam" className="button-outline btn_hero">
              Select Your Field of Study
            </Link>
          </div>
        </div>

        <div className="hero__right">
          <Lottie animationData={anim} alt="Animated exam preparation" className="animation" />
        </div>
      </Wrapper>
     
      {/* <Pdf/> */}
     

      {/* <Service /> */}
      {/* <ExitExam/> */}
    </section>
  );
};

export default Hero;
