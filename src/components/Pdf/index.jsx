import React, { useEffect, useState } from 'react';
import { Layout, Card, Image, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { fetchPdfs } from '../../Globals/incomingData';
const { Content } = Layout;
import BluePrintCard from './BluePrintCard';
import { Spin } from 'antd';
import SampleExams from './SampleExams';
import Wrapper from'./../wrapper/Wrapper';
import CollegeDepartment from '../Faculty/CollegeDepartment';

const Index = () => {
  const [pdfData, setPdfData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    const getPdfs = async () => { 
      const fetchedPdfs = await fetchPdfs();
      setPdfData(fetchedPdfs.pdfs);
    };
    getPdfs();
  }, []);

  // Filter PDFs based on selected department
  const filteredPdfs = selectedDepartment ? pdfData.filter(pdf => pdf.department.title === selectedDepartment) : pdfData;

  return (
    <Wrapper className='pdfs'>
    <div className="display-pdf-container">
        <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                <CollegeDepartment onSelectDepartment={setSelectedDepartment} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={14} xl={14}>
              <h1>{selectedDepartment ? `${selectedDepartment} 2015 Ethiopian Exit Exam Questions pdf` : ''}</h1>
              <Row gutter={[16, 16]} className="blog-row">
                {filteredPdfs.map((pdf, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                      <Link to={`/display-pdf/${pdf.name}`} state={{ pdfData: pdf }}>
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
            </Col>
            <Col xs={24} sm={24} md={24} lg={5} xl={5}>
              <BluePrintCard/>
            </Col>
          </Row>
    </div>
    </Wrapper>
  );
};

export default Index;
