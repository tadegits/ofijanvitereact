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
                      <Image src={fetchDepartmentImage(pdf.department.title)} className="blog-image" />
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
