import React, { useState, useEffect } from 'react';
import { Card, Drawer, Button, Descriptions, Spin, Row, Col } from 'antd';
import API_BASE_URL from '../../Globals/apiConfig'; // Ensure this import is correct
import './DepartmentList.scss';
import { Link } from 'react-router-dom';

const DepartmentList = ({ departments }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch exams for the selected department
  const fetchExams = async (departmentId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/examsfront/${departmentId}`);
      if (response.ok) {
        const examsData = await response.json();
        setExams(examsData); // Update exams data
      } else {
        console.error('Failed to fetch exams');
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const showDrawer = (department) => {
    setSelectedDepartment(department);
    fetchExams(department.id); // Fetch exams when department is selected
    setIsDrawerVisible(true);
  };

  const hideDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <div className="department-list">
      {departments ? (departments.map(department => (
        <div key={department.id} className="department-card">
          <Card
            hoverable
            cover={<img src="./osvg.svg" alt={`Image for ${department.title}`} />}
            onClick={() => {
              if (window.innerWidth <= 768) {
                showDrawer(department);
              } else {
                showDrawer(department);
              }
            }}
          >
            <div className="department-info">
              <h3>{department.title}</h3>
            </div>
          </Card>
        </div>
      ))) : ('')}


      <Drawer
        title={<div className="exam-name-title">Exams for {selectedDepartment?.title}</div>}
        placement="bottom"
        visible={isDrawerVisible}
        onClose={hideDrawer}
        width="100%" // Full width for mobile
        height="70%" // Adjust height for the drawer
        className="bottom-up-drawer"
        bodyStyle={{ paddingTop: 20, paddingBottom: 20, maxHeight: 'calc(100% - 50px)', overflowY: 'auto' }} // Ensure proper height for body content
      >
        {loading ? (
          <Spin tip="Loading exams..." size="large" />
        ) : (
          <div>
            {exams.length > 0 ? (
              exams
                .filter(exam => exam.questions_count >= 20) 
                .map((exam) => (
                  <Link to={`/exam/details/${exam.id}`} key={exam.id} className="exam-link">
                    <div>
                      <Descriptions
                        title={
                          <div className="exam-name-title">
                            {exam.exam_name} <p>{exam.questions_count} questions</p>
                          </div>
                        }
                        bordered
                        column={1}
                        layout="vertical"
                        size="middle"
                      >
     
                      </Descriptions>
                    </div>
                  </Link>
                ))
            ) : (
              <div>No exams available for this department.</div>
            )}
          </div>

        )}
      </Drawer>
    </div>
  );
};

export default DepartmentList;
