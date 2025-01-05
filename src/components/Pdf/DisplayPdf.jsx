import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import API_BASE_URL from '../../Globals/apiConfig';
import Wrapper from '../wrapper/Wrapper';
import ImageGallery from './ImageGallery';
import axios from 'axios';
import './DisplayPdf.scss';

const DisplayPdf = () => {
  const location = useLocation();
  const depts = location.state?.data;  // Ensure this is the department data coming from the location state
  const { id, imageIndex } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [exams, setExams] = useState([]);
  const [examsError, setExamsError] = useState('');
  const [examLoading, setExamLoading] = useState(false);
  // Define department data
  const departmentData = [
    { "title": "Accounting", "id": 50 },
    { "title": "Animal Science", "id": 28 },
    { "title": "Biodiversity", "id": 25 },
    { "title": "Biology", "id": 20 },
    { "title": "Civil Engineering", "id": 2 },
    { "title": "Computer Science", "id": 1 },
    { "title": "Construction Technology Management", "id": 15 },
    { "title": "EC Engineering", "id": 51 },
    { "title": "Economics", "id": 10 },
    { "title": "EDPM", "id": 44 },
    { "title": "English Language Literature", "id": 37 },
    { "title": "Environmental Science", "id": 21 },
    { "title": "Forestry", "id": 23 },
    { "title": "Geography", "id": 39 },
    { "title": "Information Systems", "id": 7 },
    { "title": "Journalism", "id": 41 },
    { "title": "Law", "id": 42 },
    { "title": "Management", "id": 6 },
    { "title": "Marketing", "id": 9 },
    { "title": "Mathematics", "id": 3 },
    { "title": "Pharmacy", "id": 30 },
    { "title": "Physics", "id": 18 },
    { "title": "Sociology", "id": 38 },
    { "title": "Sport", "id": 5 },
    { "title": "Statistics", "id": 17 },
    { "title": "Survey", "id": 14 },
    { "title": "Water Resource Engineering", "id": 13 }
  ];

  const deptId = departmentData.find(
    (dept) => dept.title === id
  )?.id;
  const fetchExams = async (departmentId) => {
    setExamLoading(true);
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
      setExamLoading(false);
    }
  };
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/fetchimages/${id}`);
        const fileNames = response.data;
        const urls = Array.isArray(fileNames)
          ? fileNames.map((fileName) => `${API_BASE_URL}/images/${id}/${fileName}`)
          : Object.entries(fileNames).map(([key, value]) => `${API_BASE_URL}/images/${value}`);

        setImageUrls(urls);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, [id]);

  console.log('Department ID:', deptId);  // Log deptId to check if it is correctly assigned

  return (
    <section className='pdfs'>
      <Helmet>
        <title>{depts ? `${depts.title} 2016 Ethiopian Exit Exam Questions` : 'Ethiopian Exit Exam Questions'}</title>
        <meta name="description" content={`Explore the ${depts ? depts.title : 'subject'} Ethiopian Exit Exam Questions.`} />
        <meta property="og:title" content={depts ? `${depts.title} 2016 Ethiopian Exit Exam Questions` : 'Ethiopian Exit Exam Questions'} />
        <meta property="og:description" content={`Explore the ${depts ? depts.title : 'subject'} Ethiopian Exit Exam Questions.`} />
        <meta property="og:image" content="withmoto.png" />
        <meta property="og:url" content={`${API_BASE_URL}/exit-exam/${depts?.title}/${id}`} />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": depts ? `${depts.title} Ethiopian Exit Exam` : "Ethiopian Exit Exam Questions",
            "description": `Explore the ${depts ? depts.title : 'subject'} Ethiopian Exit Exam Questions, including various topics and questions.`,
            "url": `${API_BASE_URL}/exit-exam/${depts?.title}/${id}`,
            "provider": {
              "@type": "Organization",
              "name": "Ofijan"
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "startDate": "2016-01-01",
              "identifier": id,
              "courseMode": "Exam"
            },
            "image": imageUrls.length > 0 ? imageUrls[0] : "default_image_url.jpg"
          })}
        </script>
      </Helmet>
      <Wrapper className='pdf_section'>
        <div className="display-pdf-container">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={4} xl={4}> 
              <h1>{deptId}</h1>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='pdf__viewer'> 
              <h1 className="subjectHeader">{depts ? depts.title : ''} {id} Ethiopian Exit Exam Questions</h1>
              <ImageGallery id={id} imageIndex={imageIndex} />
            </Col>

            <Col xs={24} sm={24} md={6} lg={8} xl={8}> 
              <div className="ad-banner-top">
                <ins className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-8449765590756444"
                  data-ad-slot="8261485661"
                  data-ad-format="auto responsive"
                  data-full-width-responsive="true"></ins>
              </div>
              <div className="ad-banner-bottom">
                <ins className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="autorelaxed"
                  data-ad-client="ca-pub-8449765590756444"
                  data-ad-slot="6959146314"></ins>
              </div>
            </Col>
          </Row>
        </div>
      </Wrapper>
    </section>
  );
};

DisplayPdf.propTypes = {
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object,
  studentName: PropTypes.string
};

export default DisplayPdf;
