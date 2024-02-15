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

const DisplayPdf = ({ onClose, formData, studentName }) => {
    const location = useLocation();
    const pdfData = location.state.pdfData;
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    const { id } = useParams();

    useEffect(() => {
        if (pdfData) {
            const url = `${API_BASE_URL}/pdfs/${id}`;
            setPdfUrl(url);
            fetch(url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    setPdfFile(new Uint8Array(arrayBuffer));
                    setLoading(false); // Set loading to false after PDF is fetched
                })
                .catch(error => {
                    console.error('Error fetching PDF:', error);
                });
        }
    }, [pdfData]);

    if (!pdfData) {
        return <div>No PDF data available</div>;
    }

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

    return (
        <Wrapper className='pdfs'>
            <div
                className="display-pdf-container">
                <h1>{pdfData.department ? pdfData.department.title : ''} 2015 Ethiopian Exit Exam Questions pdf</h1>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                        <BluePrintCard />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14} className='pdf__viewer'>
                        {loading ? ( // Show Spin if loading is true
                            <Spin size="large" />
                        ) : (
                            <>
                                <Viewer fileUrl={pdfFile} />
                            </>
                        )}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                        <SampleExams />
                    </Col>
                </Row>
            </div>
        </Wrapper>
    );
};

DisplayPdf.propTypes = {
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object,
    studentName: PropTypes.string
};

export default DisplayPdf;
