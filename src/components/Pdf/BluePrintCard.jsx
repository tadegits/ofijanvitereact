import React, {useEffect, useState} from 'react'
import { Card, Avatar, Descriptions,  Collapse} from 'antd';
import './pdf.scss';
import {fetchDepartments ,} from './../../Globals/incomingData'
import { fetchColleges , fetchDepartmentByCollege } from './../../Globals/api';
const { Panel } = Collapse;
const [collegesWithDepartment, setCollegeWithDepartment] = useState([]); 

useEffect(() => {
  const getCollegeWithDepartment = async () => {
    const fetchedColleges = await fetchDepartmentByCollege();
    setCollegeWithDepartment(fetchedColleges);
  };
  getCollegeWithDepartment();
}, []);


const BluePrintCard = () => {

  return (
    <div>
    <Card title={<h2>BluePrint</h2>}>

     
    </Card>

    </div>
  )
}

export default BluePrintCard
