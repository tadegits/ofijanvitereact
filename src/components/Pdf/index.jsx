import React, { useEffect, useState } from 'react';
import { Layout, Card, Image, Row, Col } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchPdfs } from '../../Globals/incomingData';
const { Content } = Layout;

const Index = () => {
  const [pdfData, setPdfData] = useState([]);

  useEffect(() => {
    const getPdfs = async () => {
      const fetchedPdfs = await fetchPdfs();
      setPdfData(fetchedPdfs.pdfs);
    };
    getPdfs();
  }, []);

  return (
    <div className="blog-list-container">
      <Card title="Exams">
        <div className="blog-body-container">
          <Row gutter={[16, 16]} className="blog-row">
            {pdfData &&
              pdfData.map((pdf, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Link to={`/display-pdf/${index}`} state={{ pdfData: pdf }}> {/* Pass pdfData to DisplayPdf component */}
                    <Card hoverable className="blog-card">
                      <Image src="https://cdn.vox-cdn.com/thumbor/uB241sgBJdoC-0ThViBxai10qP4=/0x0:800x600/1200x800/filters:focal(336x236:464x364)/cdn.vox-cdn.com/uploads/chorus_image/image/59620595/csm_holography_cyan_eaea795162.0.0.0.0.jpg" className="blog-image" />
                      <Card.Meta
                        description={
                          <div>
                            <h6 className="author-name">{pdf.department ? pdf.department.title : ''}</h6>
                          </div>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Index;
