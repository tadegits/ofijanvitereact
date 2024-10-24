import React, { useEffect, useState } from 'react';
import { Layout, Card, Image, Row, Col, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
const { Content } = Layout;
import Wrapper from './../wrapper/Wrapper';
import API_BASE_URL from '../../Globals/apiConfig';
import './pdf.scss';
import { Helmet } from 'react-helmet';
import AdvertisementCard from '../Add/AdvertisementCard';

const Index = () => {
  const [pdfData, setPdfData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const url = `${API_BASE_URL}/departments`;

  // Fetch department data
  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response1 = await fetch(url);
        const data1 = await response1.json();
        setData(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDept();
  }, []);

  // Fetch image path data
  useEffect(() => {
    const fetchImagePath = async () => {
      try {
        const response1 = await fetch(`${API_BASE_URL}/fetch_image_path`);
        const data1 = await response1.json();
        setImagePath(data1);
      } catch (error) {
        console.error('Error fetching image paths:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImagePath();
  }, []);

  const filteredDepts = selectedDepartment ? data.filter(dept => dept.id === selectedDepartment) : data;

  return (
    <section className='pdf_section'>
      {/* SEO-enhanced meta tags */}
      <Helmet>
        <title>2015 Ethiopian Exit Exam Questions | Ofijan |</title>
        <meta name="description" content="Access the 2015 Ethiopian Exit Exam questions and study resources. Prepare for the exam with PDF downloads and helpful guides." />
        <meta property="og:title" content="2015 Ethiopian Exit Exam Questions" />
        <meta property="og:description" content="Prepare for the 2015 Ethiopian Exit Exam with these downloadable PDFs of previous questions. Study effectively with Ofijan's resources." />
        <meta property="og:image" content="/withmoto.png" />
        <meta property="og:url" content="https://ofijan.com/2015_exit_pdfs" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Wrapper className='pdfs'>
        <div className="display-pdf-container">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={6} xl={6}>
              {/* Ad component */}
              <AdvertisementCard />
            </Col>

            <Col xs={24} sm={24} md={16} lg={12} xl={12} className="pdf__col">
              <h1>2015 Ethiopian Exit Exam Questions</h1>
              <p>Download the past exam questions to prepare for your exit exams. Click on a document to view or download the PDF.</p>

              {loading ? (
                <div className="loading-spinner">
                  <Spin size="large" />
                </div>
              ) : (
                <Row gutter={[16, 16]} className="pdf-row">
                  {imagePath.map((image, index) => (
                    <Col xs={24} sm={24} md={8} key={index}>
                      <Link to={`/exit-exam/${image}/1`} state={{ data: image }}>
                        <Card hoverable className="pdf__card" style={{ width: 300, height: 300 }}>
                          <Image src="./images.png" alt={`Exam PDF ${index}`} className="blog-image" />
                          <Card.Meta
                            description={
                              <div>
                                <div className='extitle'><h1 >2015 {image || 'PDF Title'} exit exam &#x1F4DA;</h1></div>
                                <h2 className="pdf-title"> {image || 'PDF Title'}</h2>
                              </div>
                            }
                          />
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>

            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
              {/* Link to blueprint */}
              <Card>
                <Link to="../blueprint">
                  <Button type="primary">View Blueprint</Button>
                </Link>
              </Card>
            </Col>
          </Row>
        </div>
      </Wrapper>
    </section>
  );
};

export default Index;
