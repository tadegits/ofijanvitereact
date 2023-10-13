import './ExitExam.scss';
import Wrapper from '../wrapper/Wrapper'
import { FaBars, FaQuestion, FaChalkboardTeacher, FaPeopleArrows, FaSchool} from 'react-icons/fa';
import { Link } from "react-router-dom";
import Counter from '../counter/CounterUpPage'
import { useRef } from 'react'
const ExitExam = () => {
 
  return <section className="exams">
    <Wrapper>
      <h3>Select Your field of Study!</h3>
    <div className='counter-up'> 
      <div className='content'>
        <div className='box'>
          <div className='icon'>
           <FaQuestion/>
          </div>
         
          <div className='text'>Engineering</div>
        </div>
        <div className='box'>
          <div className='icon'>
            <FaChalkboardTeacher/>
          </div>
         
          <div className='text'>Computing and Informatics</div>
        </div>
        <div className='box'>
          <div className='icon'>
            <FaPeopleArrows/>
          </div>
         
          <div className='text'>Agriculture</div>
        </div>
        <div className='box'>
          <div className='icon'>
            <FaSchool/>
          </div>
         
          <div className='text'>Natural and Computational</div>
        </div>
        <div className='box'>
          <div className='icon'>
            <FaSchool/>
          </div>
         
          <div className='text'>Social Science and Humanities</div>
        </div>
        <div className='box'>
          <div className='icon'>
            <FaSchool/>
          </div>
         
          <div className='text'>Partners</div>
        </div>
        <div className='box'>
          <div className='icon'>
            <FaSchool/>
          </div>
         
          <div className='text'>Partners</div>
        </div>
        <div className='box'>
          <div className='icon'>
            <FaSchool/>
          </div>
         
          <div className='text'>Partners</div>
        </div>
        <div className='box'>
          <div className='icon'>
            <FaSchool/>
          </div>
         
          <div className='text'>Partners</div>
        </div>
      </div>
    </div>
    </Wrapper>
  </section>
}

export default ExitExam