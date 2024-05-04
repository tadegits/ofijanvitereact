import React, { useEffect, useState } from 'react';
import { Layout, Card, Image, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Content } = Layout;
import BluePrintCard from './BluePrintCard';
import Wrapper from'./../wrapper/Wrapper';
import CollegeDepartment from '../Faculty/CollegeDepartment';
import API_BASE_URL from '../../Globals/apiConfig';
import './pdf.scss';
import { Helmet } from 'react-helmet';
import AdvertisementCard from '../Add/AdvertisementCard';
const Index = () => {
  const [pdfData, setPdfData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading]= useState([]);
  const [data, setData] = useState([]);
  const url = `${API_BASE_URL}/departments`;
  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response1 = await fetch(url);
        const data1 = await response1.json();

        setData(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDept();
  }, []);
  const [imagePath, setImagePath] = useState([]);
  useEffect(() => {
    const fetchImagePath = async () => {
      try {
        const response1 = await fetch(`${API_BASE_URL}/fetch_image_path`);
        const data1 = await response1.json();
        setImagePath(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagePath();
  }, []);
const filteredDepts = selectedDepartment ? data.filter(data => data.id === selectedDepartment) : data;

  return (
    <section className='pdf_section'>
      <Helmet>
                <meta property="og:title" content="2015EXITQUESTIONS" />
                <meta property="og:image" content="withmoto.png" />
                <meta property="og:url" content="https://ofijan.com/2015_exit_pdfs" />
            </Helmet>
    <Wrapper className='pdfs'>
    <div className="display-pdf-container">
        <Row gutter={24}>
            <Col xs={34} sm={34} md={34} lg={10} xl={6}>
            <AdvertisementCard/>
              
              
                {/* <CollegeDepartment onSelectDepartment={setSelectedDepartment} /> */}
            </Col>
            <Col className="pdf__col" xs={24} sm={24} md={24} lg={14} xl={14}>
              <h1>2015 Ethiopian Exit Exam Questions</h1>
              <Row gutter={[16, 16]} className="pdf-row">
                {imagePath.map((image, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                      <Link to={`/exit-exam/${image}/1`} state={{ data: image }}>
                        <Card hoverable className="blog-card pdf__card" style={{ width:300, height:300 }}>
                          <Image src="./images.png" className="blog-image" />
                          <Card.Meta
                            description={
                              <div>
                                <div>Exam &#x1F4DA;</div>
                                <h6 className="author-name">{image ? image : ''}</h6>
                              </div>
                            }
                          />
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
              {/* <ImageGallery/>  */}
              {/* <ImageSlider/>  */}
              <Card>
             
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5} xl={5}>
               
               <Card>
                <Link to="../blueprint">
                  <Button>
                        View blue print
                </Button>
                </Link>
              </Card>
              {/* <BluePrintCard/> */}
            </Col>
          </Row>
    </div>
    </Wrapper>
    </section>
  );
};

export default Index;
