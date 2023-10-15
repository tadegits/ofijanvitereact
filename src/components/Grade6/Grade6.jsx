import './Grade6.scss'
import Wrapper from '../wrapper/Wrapper'
import Questions from '../Questions/Questions'
import Img1 from '../../assets/resource1.png'
import Img2 from '../../assets/resource2.png'
import Img3 from '../../assets/resource3.png'
import Img4 from '../../assets/resource4.png'
import Img5 from '../../assets/resource5.png'
import Img6 from '../../assets/resource6.png'
import { Link } from "react-router-dom";
import { useRef } from 'react'
const Grade8 = () => {
  const course_name = useRef(0);
  return <section className="features">
    <Wrapper>
      <div className='courses_container'>
      <Link to="#" className="button-courses"> English</Link>
      <a href="#" className="button-courses">Mathematics</a>
      <a href="#" className="button-courses">Afaan Oromo</a>
      <a href="#" className="button-courses">Sience</a>
      <a href="#" className="button-courses"> English</a>
      <a href="#" className="button-courses">Mathematics</a>
        <h5 ref={course_name}> Here are sample English exam questions from our database. click See more to get all</h5> 
        
      </div>
      <div className="questions">
        <div className="questions__flag"></div>
        <div className="questions__place"> <Questions/></div>
        <div className='questions__nav'></div>
      
       </div> 
    </Wrapper>
  </section>
}

export default Grade8