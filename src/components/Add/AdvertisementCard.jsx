import React from 'react';
import { Card, Button, Col } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import './AdvertismentCard.scss';

const AdvertisementCard = () => {
  return (
    <Col xs={24} sm={12} md={8}>
      <Card
        className="advertisement-card"
        style={{ textAlign: 'center', borderRadius: '10px', overflow: 'hidden' }}
        title="Subscribe to Our YouTube Channel"
        cover={
          <img
            alt="YouTube Channel"
            src="/image.png"
            style={{ width: '100%', height: '200px' }}
          />
        }
      >
        <p>Get the latest tutorials, insights, and updates by subscribing to our channel!</p>

        {/* Redirect to YouTube Subscription Page */}
        <Button
          type="primary"
          icon={<YoutubeOutlined />}
          href="https://www.youtube.com/channel/UCoemAkZSN81iPyV4WN5gH_w?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: '100%', backgroundColor: '#FF0000', borderColor: '#FF0000' }}
        >
          Subscribe Now
        </Button>
      </Card>
    </Col>
  );
};

export default AdvertisementCard;
