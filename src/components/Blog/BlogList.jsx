import React from 'react';
import { Layout, Card, Image, Row, Col } from 'antd';
import './BlogList.scss';
import Logo from '../../assets/logo.png'; 
import BlogLandingPage from './BlogLandingPage';
import TopicsCard from './Topics/TopicsCard';

const { Content } = Layout;

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list-container">
      <Card
          title="Ofijan Blogs"
        >
        <div className='blog-body-container'>
      <TopicsCard/>
      <Row gutter={[16, 16]} className="blog-row">
      {blogs &&
        blogs.map((blog, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card hoverable className="blog-card">
              {/* <Image src={blog.image} className="blog-image" /> */}
              <Card.Meta
                
                description={
                  <div>
                    <h6 className="author-name">{blog.title}</h6>
                    <article className="blog-category">Published in: {blog.categories}</article>
                    <div className="author-info">
                      <img src={Logo} width={10} height={10} className="author__photo" />
                      <div className="author-details">
                        <p className="author-name">Mr.{blog.author}</p>
                        <p className="author-role">Writer</p>
                      </div>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: blog.body.slice(0, 100) }} className="blog-body" />
                    
                  </div>
                }
              />
              <a href={`/blog/${blog.categories}/${blog.title}/full`} className="read-more-link">Read More</a>
            </Card>
          </Col>
        ))}
    </Row>
      
      
   </div> 
   </Card>
   </div>
  );
};

export default BlogList;
