import React, {useEffect, useState} from 'react'
import { Card, Avatar, Descriptions,  Collapse} from 'antd';
import './pdf.scss';
import { fetchCollegesWithDepartment } from './../../Globals/incomingData'
import {  } from './../../Globals/api';
const { Panel } = Collapse;

const BluePrintCard = () => {
const [collegesWithDepartment, setCollegeWithDepartment] = useState([]); 

useEffect(() => {
  const getCollegeWithDepartment = async () => {
    const fetchedColleges = await fetchCollegesWithDepartment();
    setCollegeWithDepartment(fetchedColleges);
  };
  getCollegeWithDepartment();
}, []);

console.log('collegoch', collegesWithDepartment);
  return (
    <Collapse accordion>
    {collegesWithDepartment.map((college, index) => (
      <Panel header={college.college_name} key={index}>
        <ul>
          {college.departments.map((department, subIndex) => (
            <li key={subIndex}>{department.name}</li>
          ))}
        </ul>
      </Panel>
    ))}
  </Collapse>
  )
}

export default BluePrintCard
