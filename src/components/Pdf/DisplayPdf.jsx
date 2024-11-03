import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PropTypes from 'prop-types';
import { Card, Spin, Row, Col } from 'antd';
import API_BASE_URL from '../../Globals/apiConfig';
import TopicsCard from '../Blog/Topics/TopicsCard';
import './pdf.scss';
import SampleExams from './SampleExams';
import BluePrintCard from './BluePrintCard';
import Wrapper from '../wrapper/Wrapper';
import CollegeDepartment from '../Faculty/CollegeDepartment';
import ImageGallery from './ImageGallery';
import AdvertisementCard from '../Add/AdvertisementCard';

const DisplayPdf = () => {
    const location = useLocation();
    const depts = location.state?.data;
    const { id } = useParams();
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Example: Adjust pdfUrl logic here if necessary
    const pdfUrl = `${API_BASE_URL}/pdfs/${depts?.title}_${id}.pdf`; // Make sure the URL points to your PDF

    return (
        <section className='pdfs'>
            <Helmet>
                <title>{depts ? `${depts.title} 2016 Ethiopian Exit Exam Questions` : 'Display PDF'}</title>
                <meta name="description" content={`Explore the ${depts ? depts.title : 'subject'} 2016 Ethiopian Exit Exam Questions.`} />
                <meta property="og:title" content={depts ? `${depts.title} 2016 Ethiopian Exit Exam Questions` : 'Display PDF'} />
                <meta property="og:description" content={`Explore the ${depts ? depts.title : 'subject'} 2016 Ethiopian Exit Exam Questions.`} />
                <meta property="og:image" content="withmoto.png" />
                <meta property="og:url" content={`http://localhost:3000/exit-exam/${depts?.title}/${id}`} />
            </Helmet>
            <Wrapper className='pdf_section'>
                <div className="display-pdf-container">
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                            <AdvertisementCard />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={14} xl={14} className='pdf__viewer'>
                            <h1>{depts ? depts.title : 'Subject'} 2015 {id} Ethiopian Exit Exam Questions</h1>
                            <h2>{id}</h2> {/* Added additional heading */}
                            <ImageGallery id={id} />
                            {/* <SampleExams id={id} />   */}
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
