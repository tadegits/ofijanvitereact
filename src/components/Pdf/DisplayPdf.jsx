import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import API_BASE_URL from '../../Globals/apiConfig';
import Wrapper from '../wrapper/Wrapper';
import AdComponent from '../Add/AdComponent';
import ImageGallery from './ImageGallery';
import AdvertisementCard from '../Add/AdvertisementCard';
import GeneralKnowledge from './GeneralKnowledge';
import axios from 'axios';
import './DisplayPdf.scss';

const DisplayPdf = () => {
  const location = useLocation();
  const depts = location.state?.data;
  const { id, imageIndex } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            {/* Left Column: Advertisement with smaller size */}
            <Col xs={24} sm={24} md={6} lg={4} xl={4}> {/* Adjusted width to create more space for ads */}
              <AdvertisementCard />
            </Col>

            {/* Center Column: Main Content */}
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='pdf__viewer'> {/* Adjusted width for more focus on content */}
              <h1 className="subjectHeader">{depts ? depts.title : ''} {id} Ethiopian Exit Exam Questions</h1>
              <ImageGallery id={id} imageIndex={imageIndex} />
            </Col>

            {/* Right Column: Advertisement with more space for Google Ads */}
            <Col xs={24} sm={24} md={6} lg={8} xl={8}> {/* Adjusted width to give more space for ads */}
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
