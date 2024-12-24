import React, { useState, useEffect } from 'react';
import { Card, Drawer, Button, Descriptions, Spin } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import API_BASE_URL from '../../Globals/apiConfig'; // Ensure this import is correct
import './DepartmentList.scss';

const DepartmentList = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [departmentsError, setDepartmentsError] = useState('');
  const [examsError, setExamsError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching department data:', error);
        setDepartmentsError('Failed to load departments. Please try again later.');
      } finally {
        setLoadingDepts(false);
      }
    };
    fetchDepartments();
  }, []);

  const fetchExams = async (departmentId) => {
    setLoading(true);
    setExamsError('');
    try {
      const response = await fetch(`${API_BASE_URL}/examsfront/${departmentId}`);
      if (response.ok) {
        const examsData = await response.json();
        setExams(examsData);
      } else {
        throw new Error('Failed to fetch exams.');
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
      setExamsError('Failed to load exams for this department. Please try again later.');
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
      <Helmet>
        <title>2015 Ethiopian Exit Exam Questions | Ofijan</title>
        <meta
          name="description"
          content="Access the 2015 Ethiopian Exit Exam questions and study resources. Prepare for the exam with PDF downloads and helpful guides."
        />
        <meta property="og:title" content="2015 Ethiopian Exit Exam Questions" />
        <meta
          property="og:description"
          content="Prepare for the 2015 Ethiopian Exit Exam with these downloadable PDFs of previous questions. Study effectively with Ofijan's resources."
        />
        <meta property="og:image" content="/withmoto.png" />
        <meta property="og:url" content="https://ofijan.com/2015_exit_pdfs" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="header-section">
        <h1 className="headersss">Get Answers of Ethiopian Exit Exam Questions</h1>
        <p>Test yourself or study with answers. Get expert-level preparation and pass exit exams of any subject.</p>
      </div>

      {loadingDepts ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Loading resources, please wait...</p>
        </div>
      ) : departmentsError ? (
        <div className="error-message">{departmentsError}</div>
      ) : (
        <div className="body-section">
          {departments.map((department) => (
            <div key={department.id} className="department-card">
              <Card
                hoverable
                cover={<img src="./osvg.svg" alt={`Image for ${department.title}`} />}
                onClick={() => showDrawer(department)}
              >
                <div className="department-info">
                  <h3>{department.title}</h3>
                  <h4><span>&#9998;</span> Exit Exam Q & A</h4>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Drawer
        title={<div className="exam-name-title">Exams for {selectedDepartment?.title}</div>}
        placement="bottom"
        open={isDrawerVisible}
        onClose={hideDrawer}
        width="100%"
        height="70%"
        className="bottom-up-drawer"
      >
        {loading ? (
          <div className="loading"></div>
        ) : examsError ? (
          <div className="error-message">{examsError}</div>
        ) : exams.length > 0 ? (
          exams
            .filter((exam) => exam.questions_count >= 20)
            .map((exam) => (
              <Link to={`/exam/details/${exam.id}`} key={exam.id} className="exam-link">
                <Descriptions
                  title={
                    <div className="exam-name-title">
                      {exam.exam_name} <p>{exam.questions_count} questions</p>
                    </div>
                  }
                  extra={<div>Created in {new Date(exam.created_at).getFullYear()}</div>}
                  bordered
                  column={1}
                  layout="vertical"
                  size="middle"
                />
              </Link>
            ))
        ) : (
          <div>No exams available for this department.</div>
        )}
      </Drawer>
    </div>
  );
};

export default DepartmentList;
