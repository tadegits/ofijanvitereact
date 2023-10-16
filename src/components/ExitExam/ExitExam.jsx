import './ExitExam.scss';
import Wrapper from '../wrapper/Wrapper'
import ItemCard from '../ItemCard/ItemCard';
import { useRef, useState, useEffect } from 'react'

const ExitExam = () => {
  const url = "https://ofijan.com/api/departments";
  const [data, setData] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const ref = useRef(null);
  const handleDepartmentClick = (departmentId) => {
    setSelectedDepartmentId(departmentId);
  };   
    useEffect(() => {
      fetch(url) 
            .then((res) => res.json()) 
            .then((d) => setData(d)) 
      
    }, [])

    useEffect(() => {
      if(selectedDepartmentId) {

        fetch(`https://ofijan.com/api/exams/${selectedDepartmentId}`) 
            .then((res) => res.json()) 
            .then((d) => setCourses(d)) 
      }
    }, [selectedDepartmentId]);
    
  return <section className="examsholder">
    <Wrapper>
      
    <div className='exitexam'>

    
        <div className='departments'>
        <p> Select Your field of Study!</p>
        {data.map((dataObj, index) => {
          return (
           
             <div className='text'> 
              <ul><li><div key={dataObj.id} onClick={() => handleDepartmentClick(dataObj.id)}>{dataObj.title}</div></li></ul> 
             
              
             </div>
          
          
          );
        })}
         </div>

         <div className='exams_list'>
      {courses.map((course, index) => {
       return( 
          <div key={course.id} class="product-card">
  <div class="product-title">{course.exam_name}  Exam by Instructor Million Sime</div>
  <div class="product-description">Brief description of the exam questions.</div>
  <div class="product-price">$50</div>
  <div class="product-questions">Number of Questions: 100</div>
  <div class="buttons">
    <button class="preview-button">Preview</button>
    <button class="buy-button">Buy</button>
  </div>
      </div>
        )
      })}
         </div>
    </div>
    <div ref={ref} className='selected'>
      {isShown && <SelectedDepartment/>}
    </div>
    
    </Wrapper>
  </section>
}

export default ExitExam