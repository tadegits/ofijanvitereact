import React from 'react';
import './Service.scss';
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { Card, Button, Tooltip } from 'antd';
import { FileOutlined, EyeOutlined, BookOutlined, FileTextOutlined } from '@ant-design/icons';


const Service = () => {
  return (
    <Wrapper>
      <div className='service__holder'>
        {/* <h1 className='service__title'>Our Services</h1> */}
        <div className='service__cards'>
        <Link to={'./2015_exit_pdfs'} className='service__link'>
            <div className='service__card '>
              <div className='service__content'>
              <p>📝</p>
                <h2 className='service__heading'>Images of 2015 Ethiopian Exit Exam Questions</h2>
                <Tooltip title="Open Images">
                  <button className='service__button' type='primary'>Open</button>
                </Tooltip>
              </div>
            </div>
          </Link>

          <Link to={'./ExitExam'} className='service__link'>
            <div className='service__card'>
              <div className='service__content content_black'>
              <p>📝</p>
                <h2 className='service__heading'>2015 Ethiopian Exit Exam Questions in self-test mode</h2>
                <Tooltip title="Open Exams">
                  <button className='service__button' type='primary'>Open</button>
                </Tooltip>
              </div>
            </div>
          </Link>

          <Link to={'./ExitExam'} className='service__link'>
            <div className='service__card'>
              <div className='service__content '>
              <p>📝</p>
                <h2 className='service__heading'>Answers for 2015 Ethiopian Exit Exam Questions in Study mode</h2>
                <Tooltip title="Show Me Answers">
                <button className='service__button' type='primary'>Visit</button>
                </Tooltip>
              </div>
            </div>
          </Link>

          {/* <Link to={'./2015_exit_pdfs'} className='service__link'>
            <div className='service__card'>
              <div className='service__content content_black'>
              <p>📝</p>
                <h2 className='service__heading'>2015 Ethiopian National Entrance Exam Question and Answer</h2>
                <button className='service__button' type='primary'>Visit</button>
              </div>
            </div>
          </Link> */}
          <Link to={'./2015_exit_pdfs'} className='service__link'>
            <div className='service__card'>
              <div className='service__content '>
              <p>📝</p>
                <h2 className='service__heading'>Blue Print of 2015 Ethiopian National Entrance Exam Question and Answer</h2>
                <button className='service__button' type='primary'>Visit</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

export default Service;
