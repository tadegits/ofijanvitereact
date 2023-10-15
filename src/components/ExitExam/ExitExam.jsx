import './ExitExam.scss';
import Wrapper from '../wrapper/Wrapper'
import SelectedDepartment from '../SelectedDepartment/SelectedDepartment';
import ItemCard from '../ItemCard/ItemCard';
import { useRef, useState, useEffect } from 'react'
const ExitExam = () => {
  const url = "https://ofijan.com/api/colleges";
  const [data, setData] = useState([])
  const [isShown, setIsShown] = useState(false);
  const ref = useRef(null);
  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);
    ref.current?.scrollIntoView({behavior: 'smooth'});

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  const fetchInfo = () => { 
    return fetch(url) 
            .then((res) => res.json()) 
            .then((d) => setData(d)) 
    }
    
    useEffect(() => {
      fetchInfo();
    }, [])

  return <section className="examsholder">
    <Wrapper>
      
    <div className='exitexam'>

    
        <div className='departments'>
        <p> Select Your field of Study!</p>
        {data.map((dataObj, index) => {
          return (
             <div className='text'> 
              <ul><li><a href="#" onClick={handleClick}>{dataObj.title}</a></li></ul> 
             </div>
          );
        })}
         </div>

         <div className='exams_list'>
         <div class="product-card">
  <div class="product-title">Exam Questions by Instructor Million Sime</div>
  <div class="product-description">Brief description of the exam questions.</div>
  <div class="product-price">$50</div>
  <div class="product-questions">Number of Questions: 100</div>
  <div class="product-answer">Answer: Brief description of the answer.</div>
</div>
<div class="product-card">
  <div class="product-title">Exam Questions by Instructor Million Sime</div>
  <div class="product-description">Brief description of the exam questions.</div>
  <div class="product-price">$50</div>
  <div class="product-questions">Number of Questions: 100</div>
  <div class="product-answer">Answer: Brief description of the answer.</div>
</div>
<div class="product-card">
  <div class="product-title">Exam Questions by Instructor Million Sime</div>
  <div class="product-description">Brief description of the exam questions.</div>
  <div class="product-price">$50</div>
  <div class="product-questions">Number of Questions: 100</div>
  <div class="product-answer">Answer: Brief description of the answer.</div>
</div>
         </div>
    </div>
    <div ref={ref} className='selected'>
      {isShown && <SelectedDepartment/>}
    </div>
    
    </Wrapper>
  </section>
}

export default ExitExam