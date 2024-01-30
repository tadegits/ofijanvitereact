import React from 'react'
import { Card, Avatar, Descriptions,  Collapse} from 'antd';
import './TopicsCard.scss';
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


const TopicsCard = () => {

  return (
    <div>
    <Card>

      <Collapse accordion>
        {topics.map((topic, index) => (
          <Panel header={topic.title} key={index}>
            <ul>
              {topic.subtopics.map((subtopic, subIndex) => (
                <li key={subIndex}>{subtopic}</li>
              ))}
            </ul>
          </Panel>
        ))}
      </Collapse>
    </Card>

    </div>
  )
}

export default TopicsCard
