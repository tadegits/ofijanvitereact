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
        <title>2015 Ethiopian Exit Exam Questions | Ofijan  | 2016 Ethiopian Exit Exam Questions | Ethiopia Exit Exam | 2016 </title>
        <meta name="description" content="Access the 2015 Ethiopian Exit Exam questions and study resources. Prepare for the exam with PDF downloads and helpful guides." />
        <meta property="og:title" content="2015 Ethiopian Exit Exam Questions" />
        <meta property="og:description" content="Prepare for the 2015 Ethiopian Exit Exam with these downloadable PDFs of previous questions. Study effectively with Ofijan's resources." />
        <meta property="og:image" content="/withmoto.png" />
        <meta property="og:url" content="https://ofijan.com/2015_exit_pdfs" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Wrapper className='pdfs'>
        {/* Top Banner Ad */}
        <div className="ad-banner-top">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-8449765590756444"
               data-ad-slot="8261485661"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>

        <div className="display-pdf-container">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={6} xl={6}>
              {/* Sidebar Ad */}
              <AdvertisementCard />
            </Col>

            <Col xs={24} sm={24} md={18} lg={16} xl={16} className="pdf__col">
              <h1>Get Pdf for MoE Ethiopian Exit Exam Questions</h1>
              <p>Download the past exam questions to prepare for your exit exams. Click on a document to view or download the PDF.</p>

              {loading ? (
                <div className='loading_container'>
                <div className="loading">
          
                </div>
              </div>
              ) : (
                <Row gutter={[16, 16]} className="pdf-row">
                  {imagePath.map((image, index) => (
                    <>
                      {/* In-feed Ad after every 4 items */}
                      {index > 0 && index % 4 === 0 && (
                        <Col span={24}>
                          <div className="in-feed-ad">
                            <ins className="adsbygoogle"
                                 style={{ display: 'block' }}
                                 data-ad-client="ca-pub-8449765590756444"
                                 data-ad-slot="8261485661"
                                 data-ad-format="auto"></ins>
                            <script>
                              (adsbygoogle = window.adsbygoogle || []).push({});
                            </script>
                          </div>
                        </Col>
                      )}
                      
                      <Col xs={24} sm={24} md={6} key={index}>
                        <Link to={`/exit-exam/${image}/1`} state={{ data: image }}>
                          <Card hoverable className="pdf__card">
                            <Image src="./images.png" alt="2015 Exit Exam PDF for Ethiopian Students" className="blog-image" />
                            <Card.Meta
                              description={
                                <div>
                                  <div className='extitle'><h1>2015 {image || 'PDF Title'} exit exam &#x1F4DA;</h1></div>
                                  <h2 className="pdf-title"> {image || 'PDF Title'}</h2>
                                </div>
                              }
                            />
                          </Card>
                        </Link>
                      </Col>
                    </>
                  ))}
                </Row>
              )}
            </Col>
          </Row>

          {/* Bottom Banner Ad */}
          <div className="ad-banner-bottom">
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-8449765590756444"
                 data-ad-slot="8261485661"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Index;
