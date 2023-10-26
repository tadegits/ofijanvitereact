import './ExitExam.scss';
import React from "react";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from '../Sidebar/SidebarStyles';

import Wrapper from '../wrapper/Wrapper'
import Logo from "../../assets/logo.png";
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Questions from '../Questions/Questions';
import { Routes, Route, useParams } from "react-router-dom";
import { DynamicItem, Sidebar, dummyData } from "../../components";

import "../../App.css";
const ExitExam = () => {
 

  
  const id = useParams();
  const getClicked = () => {
   
    const deptId = id.id;
    const url2 = `https://ofijan.com/api/exams/${deptId}`
    console.log(deptId)
    fetch(url2)
        .then((res) => res.json())
        .then((d) => setCourses(d))
  };


  const url = "https://ofijan.com/api/departments";
  const handleLinkClick = (classname) => {
    const element = document.querySelector(`.${classname}`);
    element.scrollIntoView({ behavior: 'smooth' });
  };
  const [data, setData] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const ref = useRef(null);
  const [showExam, setShowExam] = useState("");
  const scollToRef = useRef();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }, [])

  useEffect(() => {
    getClicked();

  }, [id])


  return (
    <section className="examsholder">
      <Wrapper>
        <div className='exitexam'>

          <Sidebar />
          {/* <div className={"departments ${isOpen ? 'open' : 'closed'}"}>

            <p> Select Your field of Study!</p>
            {data.map((dataObj, index) => {
              return (
                <div className='text'>
                  <ul><li><div key={dataObj.id} onClick={() => handleDepartmentClick(dataObj.id)}>{dataObj.title}</div></li></ul>
                </div>
              );
            })} */}

          {/* </div> */}
          <div className={"exams_list"}>
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
                    <button onClick={() => scollToRef.current.scrollIntoView()} className="button-primary" >Preview</button>
                    <Link to='/Login' className="button-inline
navbar__btn">
                      Buy
                    </Link>
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

  );
}

export default ExitExam