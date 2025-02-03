import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import anim from '../../assets/aguytakingexam.json';
import Lottie from 'lottie-react';
import API_BASE_URL from '../../Globals/apiConfig';
import { Helmet } from 'react-helmet';
import { ArrowDownOutlined } from '@ant-design/icons';
import './Hero.scss';
import { Card, Button, Space } from 'antd';
import Service from '../Service/Service';
import Pdf from '../Pdf';
import ExitExam from "../ExitExam/ExitExam";
import { Spin } from 'antd'; // Importing Spin for loading state

const Hero = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const url = `${API_BASE_URL}/departments`;
  const [loading, setLoading] = useState(true);
const [loggedInUser2 , setLoggedInUser2] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched department data:', data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const loggedInUser = localStorage.getItem("user");
    if(loggedInUser){
      setLoggedInUser2(true);
    }
    const loadingTimeout = setTimeout(() => {
      setLoading(false);  // Stop loading after 10 seconds, even if data hasn't fully loaded
    }, 10000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setIsLoggedin(true);
    }
  }, []);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ofijan - Your Ultimate Online Exam Bank",
    "description": "Explore over 10,000 exit exam questions tailored for Ethiopia's national exit exams. Enhance your preparation with model exams, answers, and blueprints!",
    "url": "https://ofijan.com",
    "image": "https://ofijan.com/olml.png", 
    "keywords": [
      "Ofijan",
      "ofijan exams",
      "ofijan exit exam",
      "moe exit exam",
      "exit",
      "exit exams",
      "Ethiopia",
      "exam preparation",
      "model exit exams",
      "exam blueprints",
      "exit exam answers"
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://ofijan.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ofijan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ofijan.com/olml.png"
      }
    },
    "author": {
      "@type": "Person",
      "name": "Million Sime"
    },
    "dateModified": "2025-01-05", 
    "additionalType": "https://schema.org/Service",
    "serviceType": "Online Exam Preparation",
    "provider": {
      "@type": "Organization",
      "name": "Ofijan",
      "url": "https://ofijan.com"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://ofijan.com",
      "priceCurrency": "ETB",
      "price": "0", 
      "availability": "http://schema.org/InStock",
      "eligibleRegion": {
        "@type": "Place",
        "name": "Ethiopia"
      }
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Students preparing for exit exams in Ethiopia"
    },
    "about": {
      "@type": "CreativeWork",
      "name": "Exit Exam Questions, Model Exit Exam Questions Answers, and Blueprints",
      "description": "OFIJAN provides model exam questions, answer keys, and blueprints for Ethiopia's national exit exams."
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://ofijan.com"
        },
        // Add further items for deeper page hierarchies
      ]
    }
  }
  


  return (
    <section className="hero">
      <Helmet>
        <title>Home - Ofijan</title>
        <meta property="og:title" content="Ofijan - Your Ultimate Online Exam Bank" />
        <meta property="og:description" content="Explore over 10,000 exit exam questions tailored for Ethiopia's national exit exams. Enhance your preparation today!" />
        <meta property="og:image" content="/withmoto.png" />
        <meta property="og:url" content="https://ofijan.com" />
        <meta name="keywords" content="Ofijan, online exam bank, exit exams, Ethiopia, exam preparation, model exit exams, exam blueprints, exit exam answers" />
        <meta name="description" content="Ofijan provides a comprehensive platform with thousands of exam questions to help you ace your national exit exams in Ethiopia." />
        
        {/* Adding JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>

      <Wrapper className="hero__container">
        <div className="hero__left">
          <div className="hero__text-container">
            <h1>Welcome, <u>Ethiopian</u> Students</h1>
            <h2>Learn, study and Test your limit with OFIJAN.</h2>
            <p>
              We offer over <b><u>10,000</u><sup>+</sup></b> exit exam questions to help you excel in your studies and prepare effectively for your future. Join thousands of successful students who trust Ofijan!
            </p>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="loading-container">
              <Spin size="large" />
            </div>
          ) : (
            <div className="">
              {!loggedInUser2 ? 
              <Link to="/login">
                <div className="button-primary">
                 Get Started
                </div>
              </Link> : ''}
            </div>
          )}
        </div>

        <div className="hero__right">
          {/* <img src='/olml.png' className="animation" ></img> */}
          <Lottie animationData={anim} alt="Animated exam preparation" className="animation" />
        </div>
      </Wrapper>

      <Service />
    </section>
  );
};

export default Hero;
