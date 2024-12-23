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
      {departments?( departments.map(department => (
        <div key={department.id} className="department-card">
          <Card
            hoverable
            cover={<img src="./osvg.svg" alt={`Image for ${department.title}`} />}
            onClick={() => {
              if (window.innerWidth <= 768) {
                showDrawer(department); // Show bottom-up drawer on mobile
              } else {
                showDrawer(department); // Normal drawer on desktop
              }
            }}
          >
            <div className="department-info">
              <h3>{department.title}</h3>
            </div>
          </Card>
        </div>
      ))):('')}

  
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
                .filter(exam => exam.questions_count >= 20) // Filter exams with fewer than 20 questions
                .map((exam) => (
                  <div key={exam.id}>
                    <Descriptions
                      title={<div className="exam-name-title">{exam.exam_name} <p>{exam.questions_count} questions</p></div>}
                      bordered
                      column={1}
                      layout="vertical"
                      size="middle"
                    >
                      {/* Add more details here if needed */}
                    </Descriptions>

                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                      <Link to={`/exam/details/${exam.id}`} >
                      <Button type="primary" className="yellow-button" round>
                            Open
                          </Button>
                          </Link>
                        {/* <Link to={`/ofijan_exam_plate/testmode/${exam.id}`} >
                          <Button type="primary" className="tade-button" round>
                            Test Myself
                          </Button>
                        </Link>
                      </Col>
                      <Col span={12}>
                        <Link to={`/ofijan_exam_plate/studymode/${exam.id}`}>
                          <Button type="primary" className="yellow-button" round>
                            Study with Answer
                          </Button>
                          
                        </Link> */}
                      </Col>
                    </Row>
                  </div>
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
