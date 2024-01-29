import React from 'react';
import { Layout, Card, Image, Row, Col } from 'antd';
import './BlogList.scss';
import Logo from '../../assets/logo.png';
import BlogLandingPage from './BlogLandingPage';

const { Content } = Layout;

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list-container">
      <Row gutter={[16, 16]}>
        {blogs &&
          blogs.map((blog, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card className="blog-card" hoverable>
                <Image className="blog-image" src={'https://brandhub.co.nz/wp-content/uploads/2018/03/blog-page-placeholder-image.jpg'} />
                <Card.Meta
                  title={blog.title}
                  description={
                    <div>
                      <p className="blog__category">Published in: {blog.categories}</p>
                      <div className="author__info">
                        <img src={Logo} width={10} height={10} className="author__photo" />
                        <div className="author__details">
                          <p className="author__name">Mr.{blog.author}</p>
                          <p className="author__role">Writer</p>
                        </div>
                      </div>
                      <p className="blog__body" dangerouslySetInnerHTML={{ __html: blog.body.slice(0, 100) }} />
                    </div>
                  }
                />
                <a href={`/blog/${blog.categories}/${blog.title}/full`} className="read-more-link">Read More</a>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default BlogList;
