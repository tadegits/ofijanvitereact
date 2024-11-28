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
import './DisplayPdf.scss';

const DisplayPdf = () => {
    const location = useLocation();
    const depts = location.state?.data;
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const pdfUrl = `${API_BASE_URL}/pdfs/${depts?.title}_${id}.pdf`;
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
                            <div className="ad-banner-bottom">
                                <ins class="adsbygoogle"
                                    style={{ display: 'block' }}
                                    data-ad-client="ca-pub-8449765590756444"
                                    data-ad-slot="7174432998"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"></ins>
                                <script>
                                    (adsbygoogle = window.adsbygoogle || []).push({ });
                                </script>
                            </div>
                            <AdvertisementCard />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={14} xl={14} className='pdf__viewer'>
                            <h1 className="subjectHeader">{depts ? depts.title : 'Subject'} 2015 {id} Ethiopian Exit Exam Questions</h1>
                            <h2>{id}</h2>
                            <div className="ad-banner-bottom">
                                <ins class="adsbygoogle"
                                    style={{ display: 'block' }}
                                    data-ad-client="ca-pub-8449765590756444"
                                    data-ad-slot="7174432998"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"></ins>
                                <script>
                                    (adsbygoogle = window.adsbygoogle || []).push({ });
                                </script>
                            </div>
                            <ImageGallery id={id} />
                         
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                            <div className="ad-banner-bottom">
                                <ins className="adsbygoogle"
                                    style={{ display: 'block' }}
                                    data-ad-client="ca-pub-8449765590756444"
                                    data-ad-slot="8261485661"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"></ins>
                                <script>
                                    (adsbygoogle = window.adsbygoogle || []).push({ });
                                </script>
                            </div>
                           
                            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8449765590756444"
                                crossorigin="anonymous"></script>
                            <ins class="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-format="autorelaxed"
                                data-ad-client="ca-pub-8449765590756444"
                                data-ad-slot="6959146314"></ins>
                            <script>
                                (adsbygoogle = window.adsbygoogle || []).push({ });
                            </script>
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
