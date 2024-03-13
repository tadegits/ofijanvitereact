import React from 'react'
import './Service.scss'
import Wrapper from '../wrapper/Wrapper'
import { Link } from 'react-router-dom'
import {Card , Button} from 'antd';

const Service = () => {
  return (
    <Wrapper>
      <div className='service__holder'>
        <h1>Our Services</h1>
        <ul>
          
          <li><Link to={'./2015_exit_pdfs'}>
            <Card><div className='service__list'>
              <h1>Images of 2015 Ethiopian Exit Exam Questions</h1>
            </div>
            <Button>Open</Button>
            
            </Card>
          </Link>
          </li>
          <li>
            <Link to={'./2015_exit_pdfs'}>
             <Card > <div className='service__list'>
                <h1>2015 Ethiopian Exit Exam Questions in self test mode.</h1>
              </div>
              <Button>Visit</Button>
              </Card>
            </Link>
          </li>
          <li>
            <Link to={'./2015_exit_pdfs'}>
            <Card > <div className='service__list'>
              <h1>Answers for 2015 Ethiopian Exit Exam Questions in self study mode.</h1>
            </div>
            <Button>Visit</Button>
            </Card>
          </Link>
          </li>
          <li>
            <Link to={'./2015_exit_pdfs'}>
             <Card> <div className='service__list'>
                <h1>2015 Ethiopian National Enterance Exam Question and answer!</h1>
              </div>
              <Button>Visit</Button>
            </Card>
            </Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}

export default Service