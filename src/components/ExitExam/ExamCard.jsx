import React from 'react';
import { Card, Button, Tag, Space, Row, Col } from 'antd';
import './ExamCard.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
const ExamCard = ({ exam }) => {
  const { id, exam_name, department } = exam;

  return (
    <Card 
    className='exam_card1'
    title={exam_name} 
    key={id}
       actions={[
           <Button><Link className='button-open' to={`/ofijan_question_plate/${id}`}>
              Open
           </Link>
           </Button>
        ]}
    style={{ marginBottom: 16 }}>
      <p>
        <strong>Department:</strong> {department ? department.title : 'N/A'}
      </p>
      <Space>
     
      </Space>
    </Card>
  );
};

const ExamCardList = ({ exams }) => {
  return (
    <div className='cards__list'>
      {exams.map(exam => (
        <div span={8} key={exam.id}>
          <ExamCard exam={exam} />
        </div>
      ))}
    </div>
  );
};

export default ExamCardList;
