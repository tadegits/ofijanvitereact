import React from 'react';
import './Service.scss';
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { Helmet } from 'react-helmet'; // Import Helmet for managing meta tags

const Service = () => {
  return (
    <>
      <Helmet>
        <title>Ofijan - Ethiopian Exit Exam Preparation Services</title>
        <meta name="description" content="Explore comprehensive exam preparation services by Ofijan for Ethiopian National Exit Exams. Access model exams, answers, PDFs, and blueprints for various departments." />
        <meta name="keywords" content="Ethiopian Exit Exams, Model Exams, Exam Answers, Exam Blueprints, 2015 Ethiopian Exit Exam, National Exit Exam Preparation, Ofijan Services, exam preparation Ethiopia, online exam resources" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ofijan - Ethiopian Exit Exam Preparation Services" />
        <meta property="og:description" content="Explore a variety of exam preparation services, including model exams, answers, PDFs, and blueprints for Ethiopian National Exit Exams." />
        <meta property="og:image" content="/path/to/your-image.jpg" /> {/* Replace with an actual image URL */}
        <meta property="og:url" content="https://ofijan.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ofijan - Exam Preparation" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:title" content="Ofijan - Ethiopian Exit Exam Preparation Services" />
        <meta name="twitter:description" content="Get access to comprehensive exam resources including model exams, answers, and blueprints for Ethiopian National Exit Exams." />
        <meta name="twitter:image" content="/path/to/your-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Wrapper>
        <div className='service__holder'>
          
          <div className='service__cards'>
            {/* PDF Service */}
            <Link to={'./2015_exit_pdfs'} className='service__link'>
              <div className='service__card'>
                <div className='service__content'>
                  <p>📝</p>
                  <h2 className='service__heading'>Get PDF for Ethiopian Exit Exam Questions</h2>
                  <Tooltip title="Open Images">
                    <button className='service__button' type='primary'>Open</button>
                  </Tooltip>
                </div>
              </div>
            </Link>

            {/* Model Exams Service */}
            <Link to={'./ofijan_model_exams'} className='service__link'>
              <div className='service__card'>
                <div className='service__content content_black'>
                  <p>📝</p>
                  <h2 className='service__heading'>Ethiopian Exit Exam Questions for All Departments</h2>
                  <Tooltip title="Open Exams">
                    <button className='service__button' type='primary'>Open</button>
                  </Tooltip>
                </div>
              </div>
            </Link>

            {/* Exam Answers Service */}
            <Link to={'./ofijan_model_exams'} className='service__link'>
              <div className='service__card'>
                <div className='service__content'>
                  <p>📝</p>
                  <h2 className='service__heading'>Answers for Ethiopian Exit Exam Questions</h2>
                  <Tooltip title="Show Me Answers">
                    <button className='service__button' type='primary'>Open</button>
                  </Tooltip>
                </div>
              </div>
            </Link>

            {/* Exam Blueprint Service */}
            <Link to={'./blueprint'} className='service__link'>
              <div className='service__card'>
                <div className='service__content'>
                  <p>📝</p>
                  <h2 className='service__heading'>Blueprint of Ethiopian National Exit Exam</h2>
                  <button className='service__button' type='primary'>Open</button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Service;
