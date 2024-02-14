import React from 'react'
import { Card, Avatar, Descriptions,  Collapse} from 'antd';
import './pdf.scss';
const { Panel } = Collapse;

const topics = [
    {
      title: 'Exam',
      subtopics: ['Sport', 'Tech', 'Exam', 'Event', 'Science']
    },
    {
        title: 'Technology',
        subtopics: ['Sport', 'Tech', 'Exam', 'Event', 'Science']
      },
      {
        title: 'Sport',
        subtopics: ['Sport', 'Tech', 'Exam', 'Event', 'Science']
      },
      {
        title: 'Fashion',
        subtopics: ['Sport', 'Tech', 'Exam', 'Event', 'Science']
      },
      {
        title: 'Business',
        subtopics: ['Sport', 'Tech', 'Exam', 'Event', 'Science']
      }
];


const BluePrintCard = () => {

  return (
    <div>
    <Card title={<h1>Blue Print</h1>}>

     
    </Card>

    </div>
  )
}

export default BluePrintCard
