import React from 'react';
import { Card , Col } from 'antd';
import './AdvertismentCard.scss';
import { Link } from 'react-router-dom';


const AdvertisementCard = () => {
  return (
    
    <Link to="https://www.youtube.com/@kgg-Tech">
      <Card className='adCard'
      
      cover={<img alt="Advertisement" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg--ugmfWctSYJTWCH2EyxSNnQmWX8HB759XkRyicLNw&s" />}
    >
      <Card.Meta
        title="Madda Walabu University"
        description="Good Luck on Your Exit Exam Preparation."
      />
    </Card>
    </Link>
  );
};

export default AdvertisementCard;
