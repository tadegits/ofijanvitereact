import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import API_BASE_URL from '../../Globals/apiConfig';
import ExamCardList from '../ExitExam/ExamCard';
const SampleExams = ({ id }) => {
  const [examData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response1 = await fetch(`${API_BASE_URL}/examsfront/${id}`);
        const data1 = await response1.json();
        setExamsData(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]); 

  console.log('examData', examData);

  if (!examData || examData.length === 0) {
    return <div>No exams found</div>;
  }

  return (
    <div>
      <Card title={<h2>Sample Exams</h2>}>
        {examData.map((exam, index) => (
          <>
           {!loading &&
          (examData.length ? (
           <ExamCardList  exams={examData} />
          ) : (
            <div className='exams_card'>
              <p>We have no exams for your department. <li>Click Here</li> If you want to get notified!</p>
            </div>
          ))}
          </>
          
        ))}


      </Card>
    </div>
  );
};

export default SampleExams;
