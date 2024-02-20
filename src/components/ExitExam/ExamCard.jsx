import React, { useState } from 'react';
import { Card, Button, Space } from 'antd';
import './ExamCard.scss';
import { Link } from 'react-router-dom';
import WhatModal from '../../logedin/ExitExam/WhatModal';

const ExamCard = ({ exam, openModal }) => {
  const { id, exam_name, department, questions_count, teacher_id } = exam;
console.log('data', exam)
  if(questions_count>20)
{
   return (
    <Card
      className='exam_card1'
      title={exam_name}
      key={id}
      actions={[
        <Button className='button-open' onClick={() => openModal(exam)}>
          Open
        </Button>,
      ]}
      style={{ marginBottom: 16 }}
    >
      <p>
      <strong>Number of Questions:</strong> {questions_count}
</p>
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
    <div className='cards__list'>
      {exams.map((exam) => (
        <div span={8} key={exam.id}>
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
