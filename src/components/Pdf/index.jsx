import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Wrapper from './../wrapper/Wrapper';
import API_BASE_URL from '../../Globals/apiConfig';
import './pdf.scss';

const Index = () => {
  const [pdfData, setPdfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagePath, setImagePath] = useState([]);

  const fetchDepartmentsUrl = `${API_BASE_URL}/departments`;
  const fetchImagePathsUrl = `${API_BASE_URL}/fetch_image_path`;

  // Fetch department and image data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptResponse, imageResponse] = await Promise.all([
          fetch(fetchDepartmentsUrl),
          fetch(fetchImagePathsUrl),
        ]);

        const deptData = await deptResponse.json();
        const imagePathData = await imageResponse.json();

        setPdfData(deptData);
        setImagePath(imagePathData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 
  return (
    <section className="pdfs">
      <Helmet>
        <title>2015 Ethiopian Exit Exam Questions | Ofijan</title>
        <meta
          name="description"
          content="Access the 2015 Ethiopian Exit Exam questions and study resources. Prepare for the exam with PDF downloads and helpful guides."
        />
        <meta property="og:title" content="2015 Ethiopian Exit Exam Questions" />
        <meta
          property="og:description"
          content="Prepare for the 2015 Ethiopian Exit Exam with these downloadable PDFs of previous questions. Study effectively with Ofijan's resources."
        />
        <meta property="og:image" content="/withmoto.png" />
        <meta property="og:url" content="https://ofijan.com/2015_exit_pdfs" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Wrapper className="pdfs">
        <div className="content-container">
          <div className="main-column">
            <h1 className='headersss'>Get PDFs for MoE Ethiopian Exit Exam Questions</h1>
            <p>
              Download the past exam questions to prepare for your exit exams. Click on a
              document to view or download the PDF.
            </p>

            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading resources, please wait...</p>
              </div>
            ) : (
              <div className="pdf-grid">
                {imagePath.map((image, index) => (
                  <React.Fragment key={index}>
                    <div className="pdf-card">
                      <Link to={`/exit-exam/${image}/${0}`} state={{ data: image }}>
                        <div className="pdf-card-content">
                          <img
                            src="./images.png"
                            alt="2015 Exit Exam PDF for Ethiopian Students"
                            className="pdf-image"
                          />
                          <div className="pdf-details">
                            <h1 className="pdf-title">
                              {image || 'PDF Title'} &#x1F4DA;
                            </h1>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Bottom Ad */}
            <div className="ad-bottom">

              <ins class="adsbygoogle"
                style={{ display: 'block', marginTop: '20px' }}
                data-ad-client="ca-pub-8449765590756444"
                data-ad-slot="6489537710"
                data-ad-format="auto"
                data-full-width-responsive="true">

              </ins>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Index;
