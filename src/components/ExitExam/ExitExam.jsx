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
      else{
        fetch(`https://ofijan.com/api/exams/1`) 
            .then((res) => res.json()) 
            .then((d) => setCourses(d))
      }
      
    }, [selectedDepartmentId]);
    
  return <section className="examsholder">
    <Wrapper>
      
    <div className='exitexam'>

    
        <div className='departments'>
        <p> Select Your field of Study!</p>
        {data.map((dataObj) => {
          return (
             <div className='text' key = {dataObj.key}> 
              <ul>
                <li>
                <div key={dataObj.id} onClick={() => handleDepartmentClick(dataObj.id)}>
                {dataObj.title}
                </div>
                </li>
                </ul> 
             </div>
          );
        })}
         </div>

         <div className='exams_list'>
      {courses.map(course => {
       return( 
        <ItemCard key = {course.key} exam_name={course.exam_name} />
        );})}
         </div>
    </div>    
    </Wrapper>
  </section>
}

export default ExitExam