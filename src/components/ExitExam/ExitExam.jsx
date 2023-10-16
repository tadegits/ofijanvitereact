import './ExitExam.scss';
import Wrapper from '../wrapper/Wrapper'
import ItemCard from '../ItemCard/ItemCard';
import Logo from "../../assets/ofijan_negetive.png";
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
          <div key={course.id} className="product-card">
            <div className='product_head'>
               <img src={Logo} alt='' width={30} height={20}/>
  <div className="product-title">{course.exam_name}</div>
            </div>
           
  <div className="product-description">Brief description of the exam questions.</div>
  <div className="product-questions">This bocklet contains <b>100</b> questions</div>
  <div className="product-price"><b>only for </b><u>50.00</u> ETB</div>
  <div className="buttons">
    <button className="button-primary">Preview</button>
    <button className="button-inline">Buy</button>
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