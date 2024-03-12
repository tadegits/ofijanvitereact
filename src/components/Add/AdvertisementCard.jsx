import React from 'react';
import { Card , Col } from 'antd';
import './AdvertismentCard.scss';
import { Link } from 'react-router-dom';


const AdvertisementCard = () => {
  return (
    
    <Link to="https://www.youtube.com/@kgg-Tech">
      <Card className='adCard'
      
      cover={<img alt="Advertisement" src="../../kggtech.jpg" />}
    >
      <Card.Meta
        title="Kgg-Tech"
        description="Good Luck on Your Exit Exam Preparation."
      />
    </Card>
    </Link>
  );
};

export default AdvertisementCard;
