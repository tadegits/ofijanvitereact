import React from 'react'
import BluePrintCard from './BluePrintCard'
import './pdf.scss';
import { Layout, Card, Image, Row, Col, Button } from 'antd';
const BluePrint = () => {
  return (

    <Row gutter={24} className=''>
    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
    </Col>
    <Col xs={24} sm={24} md={24} lg={14} xl={14} className='display-pdf-container'>
      <h1>2015 Ethiopian Exit Exam Blue Print</h1>
     <BluePrintCard/>
           
      
    </Col>
    <Col xs={24} sm={24} md={24} lg={5} xl={5}>
      
      {/* <BluePrintCard/> */}
    </Col>
  </Row>
  )
}

export default BluePrint