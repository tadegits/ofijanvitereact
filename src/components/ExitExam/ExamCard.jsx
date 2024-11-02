import React, { useState } from 'react';
import { Card, Button, Space } from 'antd';
import './ExamCard.scss';
import WhatModal from '../../logedin/ExitExam/WhatModal';

// AdSense script added once in the component
const AdSenseScript = () => (
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8449765590756444" 
    crossorigin="anonymous"></script>
);

const ExamCard = ({ exam, openModal }) => {
  const { id, exam_name, department, questions_count } = exam;

  return (
    <Card
      className='exam_card1'
      title={department ? <><strong>{department.title}</strong> </> : ''}
      extra={<Button onClick={() => openModal(exam)}>Open</Button>}
      key={id}
      style={{ marginBottom: 16 }}
    >
      <p>{exam_name}</p>
      <p><strong>{questions_count} Questions:</strong></p>
      <hr />
      <Space />
    </Card>
  );
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
      {/* Load the AdSense script */}
      <AdSenseScript />

      {exams.map((exam, index) => (
        <div key={exam.id}>
          <ExamCard exam={exam} openModal={openModal} />
          
          {/* In-feed Ad every 4 exams */}
          {(index + 1) % 4 === 0 && (
            <div className='ad-infeed'>
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-format="fluid"
                   data-ad-layout-key="+g+s8-1f-3w+ci"
                   data-ad-client="ca-pub-8449765590756444"
                   data-ad-slot="8261485661"></ins>
              <script>
                {(adsbygoogle = window.adsbygoogle || []).push({})}
              </script>
            </div>
          )}
        </div>
      ))}
      {isModalOpen && selectedExamId && (
        <WhatModal examID={selectedExamId} onClose={closeModal} />
      )}
    </div>
  );
};

export default ExamCardList;
