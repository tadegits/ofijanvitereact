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
        <title>{depts ? `${depts.title} 2016 Ethiopian Exit Exam Questions` : '2016 Ethiopian Exit Exam Questions'}</title>
        <meta name="description" content={`Explore the ${depts ? depts.title : 'subject'} 2016 Ethiopian Exit Exam Questions.`} />
        <meta property="og:title" content={depts ? `${depts.title} 2016 Ethiopian Exit Exam Questions` : '2016 Ethiopian Exit Exam Questions'} />
        <meta property="og:description" content={`Explore the ${depts ? depts.title : 'subject'} 2016 Ethiopian Exit Exam Questions.`} />
        <meta property="og:image" content="withmoto.png" />
        <meta property="og:url" content={`${API_BASE_URL}/exit-exam/${depts?.title}/${id}`} />
      </Helmet>
      <Wrapper className='pdf_section'>
        <div className="display-pdf-container">
          
          <Row gutter={24}>
            {/* Left Column: Advertisement with smaller size */}
            <Col xs={24} sm={24} md={8} lg={4} xl={4}>
              <AdvertisementCard />
            </Col>
            {/* Center Column: Main Content */}
            <Col xs={24} sm={24} md={16} lg={16} xl={16} className='pdf__viewer'>
              <h1 className="subjectHeader">{depts ? depts.title : ''} 2015 {id} Ethiopian Exit Exam Questions</h1>
              <ImageGallery id={id} imageIndex={imageIndex} />
            </Col>
            <Col xs={24} sm={24} md={8} lg={4} xl={4}>
              <div className="ad-banner-bottom">
                <ins className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-8449765590756444"
                  data-ad-slot="8261485661"
                  data-ad-format="auto responsive"
                  data-full-width-responsive="true"></ins>
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