import React, { useState, useEffect } from 'react';
import { Card, Drawer, Button, Descriptions, Spin, Row, Col } from 'antd';
import API_BASE_URL from '../../Globals/apiConfig'; // Ensure this import is correct
import './DepartmentList.scss';
import { Link } from 'react-router-dom';
import { Description } from '@material-ui/icons';
import axios from 'axios';

const DepartmentList = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [departmentURI, setDepartmentUri] = useState('');
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    setDepartmentUri(`${API_BASE_URL}/departments`);
    axios.get(departmentURI)
      .then(response => {
        setDepartments(response.data);  
        setLoadingDepts(false)
      })
      .catch(error => {
        console.error('Error fetching department data:', error);
      });
  }, [departmentURI]); 
  
  const fetchExams = async (departmentId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/examsfront/${departmentId}`);
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

  const showDrawer = (department) => {
    setSelectedDepartment(department);
    fetchExams(department.id); 
    setIsDrawerVisible(true);
  };

  const hideDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <div className="department-list">

      <div className="header-section">
      <h1 className='headersss'>
        Get Answers of Ethiopian Exit Exam Questions
      </h1>
      <p>
        Test your self or study with answers. Get expert-level preparation and pass exit exams of any subject.
      </p>
</div>  
{loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading resources, please wait...</p>
              </div>
            ) : (
<div className="body-section">
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
              <h4><span>&#9998;</span> Exit Exam Q & A</h4>
            </div>
          </Card>
        </div>
      ))) : ('')}


      <Drawer
        title={<div className="exam-name-title">Exams for {selectedDepartment?.title}</div>}
        placement="bottom"
        visible={isDrawerVisible}
        onClose={hideDrawer}
        width="100%" 
        height="70%" 
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
                        extra={<div> Create in {new Date(exam.created_at).getFullYear()}</div>}
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
    </div>)}
    </div>
  );
};

export default DepartmentList;
