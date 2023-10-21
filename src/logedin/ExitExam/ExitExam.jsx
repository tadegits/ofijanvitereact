import '../../components/ExitExam/ExitExam.scss';
import Wrapper from '../../components/wrapper/Wrapper';
import Logo from "../../assets/logo.png";
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Questions from '../../components/Questions/Questions';

const ExitExam = () => {
  const url = "https://ofijan.com/api/departments";
  const handleLinkClick = (classname) => {
    const element = document.querySelector(`.${classname}`);
    element.scrollIntoView({ behavior: 'smooth' });
  };
  const [data, setData] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const ref = useRef(null);
  const scollToRef = useRef();
  const handleDepartmentClick = (departmentId) => {
    setSelectedDepartmentId(departmentId);
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))

  }, [])

  useEffect(() => {
    if (selectedDepartmentId) {

      fetch(`https://ofijan.com/api/exams/${selectedDepartmentId}`)
        .then((res) => res.json())
        .then((d) => setCourses(d))
    }
    else {
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
            return (
              <div key={course.id} className="product_card">
                <div className='product_head'>
                  <img src={Logo} alt='' width={30} height={20} />
                  <div className="product-title">{course.exam_name}</div>
                </div>

                <div className="product-description">Brief description of the exam questions.</div>
                <div className="product-questions">This bocklet contains <b>100</b> questions</div>
                <div className="product-price">Only for 50.00 ETB</div>
                <div className="buttons">
                  <button onClick={() => scollToRef.current.scrollIntoView()} className="preview-button" >Preview</button>
                  <a href='/Login' className="buy-button
navbar__btn">
                    Buy
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div ref={ref} className='selected'>
        {isShown && <SelectedDepartment />}
      </div>
      <div className='previewDiv' ref={scollToRef}>
        <Questions />
      </div>
    </Wrapper>
  </section>
}

export default ExitExam