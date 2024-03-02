import React from 'react';
import { Typography, List, Avatar, Space } from 'antd';
import { UserOutlined, LinkedinOutlined, GithubOutlined, PhoneOutlined } from '@ant-design/icons';
import './footer.scss';

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  const teamMembers = [
    { name: 'Million Sime', linkedin: 'https://www.linkedin.com/in/million-sime/', github: 'https://github.com/millionsime', phone: '+1234567890' },
    { name: 'Tadele Shimelis', linkedin: 'https://www.linkedin.com/in/tadele-shimelis/', github: 'https://github.com/tadelesh', phone: '+0987654321' }
  ];

  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <Title level={1}>About Us</Title>
        <Paragraph>
          Welcome to Ofijan, your premier destination for cutting-edge software solutions and services. At Ofijan, we pride ourselves on utilizing the latest technologies, including Laravel, React, Odoo CRM, Firebase, and more, to deliver top-notch software products tailored to your needs.
        </Paragraph>

        <section className="service-section">
          <Title level={2}>Our Services</Title>
          <List
            bordered
            dataSource={[
              'Full Stack Software Development',
              'API Integration',
              'Tutoring and Consultancy',
              'Payment Getway Integration Service',
              'Graphic Design Services including logo, banner, YouTube thumbnail, and 3D design',
            ]}
            renderItem={item => (
              <List.Item>
                <Typography.Text>{item}</Typography.Text>
              </List.Item>
            )}
          />
        </section>

        <section className="team-section">
          <Title level={2}>Our Team</Title>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={teamMembers}
            renderItem={member => (
              <List.Item>
                <Avatar icon={<UserOutlined />} />
                <div>
                  <Title level={4}>{member.name}</Title>
                  <Space>
                    <a href={member.linkedin}><LinkedinOutlined /></a>
                    <a href={member.github}><GithubOutlined /></a>
                    <a href={`tel:${member.phone}`}><PhoneOutlined /></a>
                  </Space>
                </div>
              </List.Item>
            )}
          />
        </section>

        <section className="technologies-section">
          <Title level={2}>Technologies We Use</Title>
          <div className="technologies-grid">
            <div className="technology-category">
              <Title level={3}>Back End</Title>
              <List
                dataSource={['Laravel', 'Node JS', 'Firebase', 'Mongo DB']}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </div>
            <div className="technology-category">
              <Title level={3}>Front End</Title>
              <List
                dataSource={['HTML, CSS, SaSS, TAilwind and Botstrap', 'React JS', 'Next JS']}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </div>
            <div className="technology-category">
              <Title level={3}>CMS AND ERP</Title>
              <List
                dataSource={['Odoo CRM', 'Wordpress', 'Moodle', 'Elementer']}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </div>
            <div className="technology-category">
              <Title level={3}>Mobile Application Development</Title>
              <List
                dataSource={['Android Studio', 'Flutter']}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </div>
            <div className="technology-category">
              <Title level={3}>Graphics</Title>
              <List
                dataSource={['Adobe Illustrator', 'Adobe Photoshop']}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </section>

        <section className="design-section">
          <Title level={2}>Design</Title>
          <Paragraph>
            We believe in creating beautiful and intuitive designs that enhance user experience. Our team is proficient in Ant Design, JSX, and SASS, ensuring that your products not only function flawlessly but also look stunning.
          </Paragraph>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
