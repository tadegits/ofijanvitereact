// ExitExam.jsx
import React, { useState, useEffect } from 'react';
import Wrapper from '../wrapper/Wrapper';
import Logo from '../../assets/logo.png';
import { Card, Button, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../Globals/apiConfig';
import ExamCardList from './ExamCard';

const ExitExam = () => {
  const { Meta } = Card;
  const url = `${API_BASE_URL}/departments`;
  const url2 = `${API_BASE_URL}/way_exams`;
  const [data, setData] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(6);
  const [loading, setLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [role, setRole] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser !== null) {
      setIsLoggedin(true);
      const userLogged = JSON.parse(loggedUser);
      setRole(userLogged.user.role_id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(url);
        const response2 = await fetch(url2);
        const data1 = await response1.json();
        const data2 = await response2.json();

        setData(data1);
        setExams(data2);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading for 10 seconds
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    fetchData();

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleDepartmentChange = async (event) => {
    const selectedDepartmentId = event.target.value;
    setSelectedDepartmentId(selectedDepartmentId);

    if (selectedDepartmentId) {
      try {
        const response = await fetch(`${API_BASE_URL}/exams/${selectedDepartmentId}`);
        if (response.ok) {
          const examsData = await response.json();
          setExams(examsData);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    } else {
      setExams([]);
    }
  };

  const NO_NAME = 'No Name';
  const NO_DESCRIPTION = 'No Description';

  const ExamCard = ({ exam }) => {
    const { id, exam_name, description, questions_count } = exam;

    return (
      <Card
        key={id}
        cover={<img className='__logo' alt="logo" src={Logo} style={{ width: 50, height: 30 }} />}
        actions={[
          <Link className='button-open' to={`/ofijan_question_plate/${id}`}>
            Open
          </Link>
        ]}
      >
        <Meta
          title={exam_name || NO_NAME}
          description={description || NO_DESCRIPTION}
          no_of_question={questions_count || "0"}
          ofijan_id={`OF${id}${id}IN` || "-"}
        />
      </Card>
    );
  };

  return (
    <section className='exit_exam_nli'>
      <div className='select_field'>
        <p>Select Your field of study</p>
        <div className='input_holder'>
          <select name='department' className='dept' onChange={handleDepartmentChange} defaultValue='' required>
            <option value=''>All</option>
            {data.map((data) => (
              <option key={data.id} value={data.id}>
                {data.title}
              </option>
            ))}
          </select>
        </div>
        {isLoggedin ? (
          <Button>
            <Link to='/easyexam'>
              Take Exam now!
            </Link>
          </Button>
        ) : (
          <Button>
            <Link to='/Login' >
              Take Exam now!
            </Link>
          </Button>
        )}
      </div>

      <Wrapper className='examsholder'>
        {loading && <p>Loading...</p>}

        {!loading &&
          (exams.length ? (
           <ExamCardList  exams={exams} />
          ) : (
            <div className='exams_card'>
              <p>We have no exams for your department. <li>Click Here</li> If you want to get notified!</p>
            </div>
          ))}
      </Wrapper>
    </section>
  );
};

export default ExitExam;
