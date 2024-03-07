import React from 'react';
import { Card } from 'antd';
import './DepartmentList.scss';

const DepartmentList = ({ departments }) => {
    console.log('depart', departments)
  return (
    <div className="department-list">
      {departments.map(department => (
        <div key={department.id} className="department-card">
          <p>{department.title}</p>
          {/* <p>Total Exams: {department.totalExams}</p> */}
          {/* <p>Total Questions: {department.totalQuestions}</p> */}
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;
