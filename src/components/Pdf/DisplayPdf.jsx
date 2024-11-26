import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import API_BASE_URL from '../../Globals/apiConfig';
import Wrapper from '../wrapper/Wrapper';
import ImageGallery from './ImageGallery';
import './DisplayPdf.scss'; // CSS file for styling

const DisplayPdf = () => {
    const location = useLocation();
    const depts = location.state?.data;
    const { id } = useParams();
    const pdfUrl = `${API_BASE_URL}/pdfs/${depts?.title}_${id}.pdf`;

    return (
        <section className="pdfs">
            <Helmet>
                <title>
                    {depts
                        ? `${depts.title} 2016 Ethiopian Exit Exam Questions`
                        : 'Display PDF'}
                </title>
                <meta
                    name="description"
                    content={`Explore the ${depts ? depts.title : 'subject'} 2016 Ethiopian Exit Exam Questions.`}
                />
                <meta
                    property="og:title"
                    content={depts
                        ? `${depts.title} 2016 Ethiopian Exit Exam Questions`
                        : 'Display PDF'}
                />
                <meta
                    property="og:description"
                    content={`Explore the ${depts ? depts.title : 'subject'} 2016 Ethiopian Exit Exam Questions.`}
                />
                <meta property="og:image" content="withmoto.png" />
                <meta
                    property="og:url"
                    content={`http://localhost:3000/exit-exam/${depts?.title}/${id}`}
                />
            </Helmet>

            <Wrapper className="pdf_section">
                <div className="display-pdf-container">
                    <div className="layout-container">
                        {/* Left Ad Section */}
                        <aside className="left-ad">
                            <div className="ad-card">Ad Placeholder 1</div>
                            <div className="ad-card">Ad Placeholder 2</div>
                            <div className="ad-card">Ad Placeholder 3</div>
                        </aside>

                        {/* Main Content Section */}
                        <main className="main-content">
                            <h1>
                                {depts ? depts.title : 'Subject'} 2015 {id}{' '}
                                Ethiopian Exit Exam Questions
                            </h1>
                            <h2>{id}</h2>
                            <ImageGallery id={id} />
                        </main>

                        {/* Right Ad Section */}
                        <aside className="right-ad">
                            <div className="ad-card">Ad Placeholder 4</div>
                            <div className="ad-card">Ad Placeholder 5</div>
                            <div className="ad-card">Ad Placeholder 6</div>
                        </aside>
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

DisplayPdf.propTypes = {
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object,
    studentName: PropTypes.string,
};

export default DisplayPdf;
