import React from 'react'
import BluePrintCard from './BluePrintCard'
import './pdf.scss';
import Wrapper from '../wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { Layout, Card, Image, Row, Col, Button } from 'antd';
import { Margin } from '@mui/icons-material';
const BluePrint = () => {
  return (
    <section className='pdf_section'>
<Wrapper className='pdfs'>
    <div className="display-pdf-container">
    <Row gutter={24} className=''>
    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
      <Card title={<h2>2015 Exit Exam</h2>}>
        <Link to='../2015_exit_pdfs'>
          <Button >Open</Button>
        </Link>
      </Card>
    </Col>
    <Col xs={24} sm={24} md={24} lg={14} xl={14} className='display-pdf-container'>
      <h1> Ethiopian National Exit Exam Blue Print</h1>
     <BluePrintCard/>
    </Col>
    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
    <Card title={<h2>Self Test Exams</h2>}>
        <Link to='../2015_exit_pdfs'>
          <Button >Open</Button>
        </Link>
      </Card>
      {/* <BluePrintCard/> */}
    </Col>
  </Row></div>
  </Wrapper>
  </section>
  )
}

export default BluePrint