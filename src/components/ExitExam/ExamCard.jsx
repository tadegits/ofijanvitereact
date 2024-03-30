import React, { useState } from 'react';
import { Card, Button, Space } from 'antd';
import './ExamCard.scss';
import { Link } from 'react-router-dom';
import WhatModal from '../../logedin/ExitExam/WhatModal';

const ExamCard = ({ exam, openModal }) => {
  const { id, exam_name, department, questions_count, teacher_id } = exam;
  console.log('data', exam)
  if (questions_count > 20) {
    return (
      <Card
        className='exam_card1'
        title={department ? <><strong>{department.title}</strong> </> : ''}
      
        extra={<Button  onClick={() => openModal(exam)}>
            Open
          </Button>}
        key={id}
        actions={[
          ,
          //         <Link to={`/ofijan_exam_plate/testmode/${id}`} >
          //              <Button className='button-open'>
          //            Open
          //          </Button>
          //             </Link>ofijan_exam_plate/studymode

          //  <Link to={`/ofijan_exam_plate/studymode/${id}`} >
          //              <Button className='button-open'>
          //            Open
          //          </Button>
          //             </Link> 

        ]}
        style={{ marginBottom: 16 }}
      >
        <p>
        {exam_name}
        </p>
        <p>
          <strong>{questions_count} Questions:</strong>
        </p>
        <hr></hr>


        <Space></Space>
      </Card>
    );
  }

};

const ExamCardList = ({ exams }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  const openModal = (exam) => {
    setIsModalOpen(true);
    setSelectedExamId(exam.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExamId(null);
  };

  return (
    <div className='cardsholder'>
      {exams.map((exam) => (
        <div key={exam.id}>
          <ExamCard exam={exam} openModal={openModal} />

        </div>
      ))}
      {isModalOpen && selectedExamId && (
        <WhatModal examID={selectedExamId} onClose={closeModal} />
      )}
    </div>
  );
};

export default ExamCardList;
