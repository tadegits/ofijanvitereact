import React, { useState, useEffect } from "react";
import Wrapper from '../../components/wrapper/Wrapper';
import Logo from "../../assets/logo.png";
import { useParams } from 'react-router-dom';
import useLoggedInUser from '../../Globals/useLoggedInUser';
import API_BASE_URL from '../../Globals/apiConfig';
import WhatModal from './WhatModal';
import { Card } from 'antd';
import ExamCardList from '../../components/ExitExam/ExamCard';
import ExitExam from '../../components/ExitExam/ExitExam';

const LExitExam = () => {
  const { Meta } = Card;
  const { userId } = useLoggedInUser();
  const { deptId } = useParams();
  const [departmentTitle, setDepartmentTitle] = useState('');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/examsfront/${deptId}`);
        if (response.ok) {
          const examsData = await response.json();
          setExams(examsData);
        } else {
          console.error('Failed to fetch exams');
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };

    if (deptId) {
      fetchExams();
    }
  }, [deptId]);

  const openModal = (exam) => {
    setIsModalOpen(true);
    setSelectedExamId(exam.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
     
        <>
          {/* <Wrapper>
            {exams.length ? (
              <ExamCardList exams={exams} openModal={openModal} />
            ) : (
             
                <p>We have no exams for your department.</p>
            )}
          </Wrapper> */}
          <ExitExam />
          {isModalOpen && selectedExamId && ( 
            <WhatModal examID={selectedExamId} onClose={closeModal} /> 
          )}  
        </>
      
    </div>
  );
};

export default LExitExam;
