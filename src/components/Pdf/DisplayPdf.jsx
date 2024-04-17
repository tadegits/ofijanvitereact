import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import PropTypes from 'prop-types';
import { Card, Spin, Row, Col } from 'antd';
import API_BASE_URL from '../../Globals/apiConfig';
import { useParams } from 'react-router-dom';
import TopicsCard from '../Blog/Topics/TopicsCard';
import './pdf.scss'
import SampleExams from './SampleExams';
import BluePrintCard from './BluePrintCard';
import Wrapper from '../wrapper/Wrapper';
import CollegeDepartment from '../Faculty/CollegeDepartment';
import ImageGallery from './ImageGallery';
import AdvertisementCard from '../Add/AdvertisementCard';
import { Helmet } from 'react-helmet';

const DisplayPdf = () => {
    const location = useLocation();
    const depts = location.state?.data;
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const { id } = useParams();
    return <section className='pdfs'>
        <Helmet>
            <meta property="og:title" content="display pdf" />
            <meta property="og:image" content="withmoto.png" />
            <meta property="og:url" content="https://ofijan.com/2015_exit_pdfs" />
        </Helmet>
        <Wrapper className='pdf_section'>


            <div className="display-pdf-container">
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                        <AdvertisementCard />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14} className='pdf__viewer'>
                        <h1>{depts ? depts.title : ''} 2015 Ethiopian Exit Exam Questios</h1>
                        <ImageGallery id={id} />
                        {/* <SampleExams id={id} />   */}
                    </Col>
                    {/* <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                        <BluePrintCard />
                    </Col> */}
                </Row>
            </div>
        </Wrapper>;
    </section>
}

DisplayPdf.propTypes = {
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object,
    studentName: PropTypes.string
};

export default DisplayPdf;
