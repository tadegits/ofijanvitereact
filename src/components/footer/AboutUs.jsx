import React from 'react';
import { Typography, List, Avatar, Space } from 'antd';
import { UserOutlined, LinkedinOutlined, GithubOutlined, PhoneOutlined } from '@ant-design/icons';
import './footer.scss';

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  const teamMembers = [
    { image: 'data:image/jpeg;base64,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' 
    , name: 'Million Sime', linkedin: 'https://www.linkedin.com/in/million-sime-a84978185/', 
    position: '',
    github: 'https://github.com/millionsime', phone: '+251900267857' },
    { image: 'data:image/jpeg;base64,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', 
    name: 'Tadele Shimelis', linkedin: 'https://www.linkedin.com/in/tadele-shimelis/', 
    position: '',
    github: 'https://github.com/tadegits', phone: '+251921091121' }
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
                <Avatar src={member.image} />
                <div>
                  <Title level={4}>{member.name}</Title>
                  <p style={{ color: 'gray', margin: 0 }}>{member.position}</p>
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
