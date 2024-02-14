import React, {useEffect} from 'react'
import { Card, Avatar, Descriptions,  Collapse} from 'antd';
import './pdf.scss';
import {fetchDepartments ,} from './../../Globals/incomingData'
import { fetchColleges , fetchDepartmentByCollege } from './../../Globals/api';
const { Panel } = Collapse;

useEffect([] => )



const BluePrintCard = () => {

  return (
    <div>
    <Card title={<h2>BluePrint</h2>}>

     
    </Card>

    </div>
  )
}

export default BluePrintCard
