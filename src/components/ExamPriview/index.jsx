import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // For SEO meta tags
import { Button, Spin, Descriptions, Row, Col } from 'antd';
import { Link, useParams } from 'react-router-dom';
import API_BASE_URL from '../../Globals/apiConfig';
import './ExamPreview.scss';

const ExamPreview = () => {
  const { examId } = useParams(); // Get examId from route params
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExamDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/examsfront/${examId}`);
        if (response.ok) {
          const data = await response.json();
          setExamDetails(data);
        } else {
          console.error('Failed to fetch exam details');
        }
      } catch (error) {
        console.error('Error fetching exam details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  useEffect(() => {
    // Dynamically inject AdSense script
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    adsenseScript.setAttribute('data-ad-client', 'YOUR-ADSENSE-CLIENT-ID');
    document.head.appendChild(adsenseScript);

    return () => {
      document.head.removeChild(adsenseScript);
    };
  }, []);

  return (
    <div className="exam-preview">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{examDetails ? `Preview: ${examDetails.exam_name}` : 'Exam Preview'}</title>
        <meta
          name="description"
          content={
            examDetails
              ? `Preview details for the exam "${examDetails.exam_name}" with ${examDetails.questions_count} questions.`
              : 'Preview exam details, number of questions, and options to test or study more.'
          }
        />
        <meta name="keywords" content="Exam Preview, Online Exam, Test Yourself, Study More" />
      </Helmet>

      {loading ? (
        <Spin tip="Loading exam details..." size="large" />
      ) : examDetails ? (
        <div className="exam-content">
          <Descriptions
            title={<div className="exam-title">{examDetails.exam_name}</div>}
            bordered
            column={1}
            layout="vertical"
            size="middle"
          >
            <Descriptions.Item label="Number of Questions">
              {examDetails.questions_count}
            </Descriptions.Item>
            {/* Add more details as needed */}
          </Descriptions>

          {/* AdSense Placeholder */}
          <div className="adsense-block">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-layout="in-article"
              data-ad-format="fluid"
              data-ad-client="YOUR-ADSENSE-CLIENT-ID"
              data-ad-slot="YOUR-AD-SLOT-ID"
            />
          </div>

          <Row gutter={[16, 16]} className="button-row">
            <Col span={12}>
              <Link to={`/ofijan_exam_plate/testmode/${examId}`}>
                <Button type="primary" className="tade-button">
                  Test Myself
                </Button>
              </Link>
            </Col>
            <Col span={12}>
              <Link to={`/ofijan_exam_plate/studymode/${examId}`}>
                <Button type="primary" className="yellow-button">
                  Study More
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      ) : (
        <div>No details available for this exam.</div>
      )}
    </div>
  );
};

export default ExamPreview;
