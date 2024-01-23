import Wrapper from '../wrapper/Wrapper'
import { Link } from 'react-router-dom';
import './easyexam.scss';
const index= () => {
  return <section className='easyExam' >
    <Wrapper className='easy_exam_wrapper' >
      <div className='easy_exam_input_holder'>
       <input className='searchExam' type='text' name='examID' placeholder='Enter exam Id'/>
       <input type='submit' className='searchExamBtn' name="Search Exam" value="Search Exam"/>
      </div>
    </Wrapper>
  </section>
}

export default index