import '../../components/ExitExam/ExitExam.scss';
import React from "react";
import Wrapper from '../../components/wrapper/Wrapper'
import Logo from "../../assets/logo.png";
import { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useLoggedInUser from '../../Globals/useLoggedInUser';
import API_BASE_URL from '../../Globals/apiConfig';
import WhatModal from './WhatModal';
import { Card, Button, Modal, Input } from 'antd';
import ExitExam from '../../components/ExitExam/ExitExam';
import ExamCardList from '../../components/ExitExam/ExamCard';
const LExitExam = () => {
  const { Meta } = Card;
  const { deptId, userId } = useLoggedInUser();
  const url = `${API_BASE_URL}/departments`;
  const [departmentTitle, setDepartmentTitle] = useState('');
  const [did, setDid] = useState('');
  const id = useParams();
  const [data, setData] = useState([]);
  const [price_tag, setPriceTag] = useState('');
  const [exams, setExams] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedExamId, setSelectedExamId] = useState(null);
  const scollToRef = useRef();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) { 
          const foundUser = JSON.parse(loggedInUser);
          setDid(foundUser.user.dept_id);
          if (foundUser.user.dept_id !== null) {
            console.log(data)
            setDepartmentTitle(data.title);
            console.log('the data', data.title);
            fetch(`${API_BASE_URL}/examsfront/${foundUser.user.dept_id}`)
              .then((res) => res.json())
              .then((d) => setExams(d))
              .catch((error) => console.error('Error fetching exams:', error));
          }
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const handleDepartmentChange = async (event) => {
    const selectedDepartmentId = event.target.value;
    setSelectedDepartmentId(selectedDepartmentId);
    if (selectedDepartmentId) {
      try {
        const response = await fetch(`${API_BASE_URL}/examsfront/${selectedDepartmentId}`);
        if (response.ok) {
          const examsData = await response.json();
          setExams(examsData);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    } else {
      setCourses([]);
    }
  };
  const openModal = (exam) => {
    setIsModalOpen(true);
    setSelectedExamId(exam.id);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  
  }
  return (
    <section className='exit_exam_nli'>
      
      <Wrapper className="examsholder">
      
          {exams.length ? (
           <ExamCardList  exams={exams} />
          ) : (
            <div className='exams_card'>
              <p>We have no exams for your department. <li>Click Here</li> If you want to get notified!</p>
            </div>
          )}
        {/* {Array.isArray(exams) && exams.length > 0 ? ((exams.map((exam, index) => {
          return (
            <Card
                        key={exams.id}
                        className="exams_card"
                        cover={<img className='__logo' alt="logo" src={Logo} style={{ width: 50, height: 30 }} />}
                        actions={[
                          
                    <Button className='button-open' onClick={()=> openModal(exam)}>Open</Button>
                  
                        ]}
                    >
                        <Meta
                            title={exam.exam_name ? exam.exam_name : 'No Name'}
                            description={exam.description ? exam.description : 'No Description!'}
                        />
                        <div className="underline"></div>
                        <p>
                            <b>Booklet Name:</b> {exam.exam_name}
                        </p>
                        <p>
                            <b>Ofijan Id:</b> OF{exam.id}{exam.id}IN
                        </p>
                        <p>
                            <b>Prepared By:</b> Gaki Serocho
                        </p>
                        <p>
                            <b>Total no of Questions:</b> {exam.questions_count}
                        </p>
                        <p>
                            <b>Topics Covered:</b> 12
                        </p>
                    </Card>
          )
        }))) : (<div className='exams_card'>
          <p>We have no exams for your department. <li>Click Here</li> If you wan't to get notified!</p>
        </div>)} */}
Other Exams
        
      </Wrapper>
      
      <ExitExam/>
      {isModalOpen && selectedExamId && ( 
        <WhatModal  examID={selectedExamId} onClose={closeModal} /> 
      )}
    </section>
  );
}
export default LExitExam