import React from 'react';
import { Card, Tag, Space, Row, Col } from 'antd';
import './ExamCard.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
const ExamCard = ({ exam }) => {
  const { id, exam_name, department } = exam;

  return (
    <Card 
    title={exam_name} 
    key={id}
       
       actions={[
           <Link className='button-open' to={`/ofijan_question_plate/${id}`}>
              Open
           </Link>
        ]}
    style={{ marginBottom: 16 }}>
      <p>
        <strong>Department:</strong> {department ? department.title : 'N/A'}
      </p>
      {/* <p>
        <strong>Exam Date:</strong> {exam_date}
      </p>
      <p>
        <strong>Exam Duration (mins):</strong> {exam_duration}
      </p>
      <p>
        <strong>Exam Grade:</strong> {exam_grade}
      </p> */}
      {/* <p>
        <strong>Status:</strong> 
        <Tag color={status === '1' ? 'green' : 'red'}>
          {status === '1' ? 'Active' : 'Inactive'}
        </Tag>
      </p> */}
      <Space>
     
      </Space>
    </Card>
  );
};

const ExamCardList = ({ exams }) => {
  return (
    <Row gutter={16}>
      {exams.map(exam => (
        <Col span={8} key={exam.id}>
          <ExamCard exam={exam} />
        </Col>
      ))}
    </Row>
  );
};

export default ExamCardList;
