import React, {useEffect, useState} from 'react'
import { Card, Avatar, Descriptions,  Collapse} from 'antd';
import './pdf.scss';
import {fetchDepartments ,} from './../../Globals/incomingData'
import { fetchColleges , fetchCollegesWithDepartment } from './../../Globals/api';
const { Panel } = Collapse;
const [collegesWithDepartment, setCollegeWithDepartment] = useState([]); 

useEffect(() => {
  const getCollegeWithDepartment = async () => {
    const fetchedColleges = await fetchCollegesWithDepartment();
    setCollegeWithDepartment(fetchedColleges);
  };
  getCollegeWithDepartment();
}, []);


const BluePrintCard = () => {

  return (
    <div>
{collegesWithDepartment.map((college)=>{
  <Card title={<h2>{college.college_name}</h2>}>

     
    </Card>
})}
    

    </div>
  )
}

export default BluePrintCard
