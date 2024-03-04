import React, { useState } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import './BlogList.scss';
import Logo from '../../assets/logo.png'; 
import BlogCategories from './BlogCategories';
import { Link } from 'react-router-dom';
const { Content } = Layout;

const BlogList = ({ blogs }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [error, setError] = useState(null);

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredBlogs = selectedCategory ? blogs.filter(blog => blog.categories === selectedCategory) : blogs;

  return (
    <div className="blog-list-container">
      <Card title="Ofijan Blogs">
        <div className='blog-body-container'>
          <BlogCategories onSelectCategory={setSelectedCategory}/>
          <Row gutter={[16, 16]} className="blog-row">
            {filteredBlogs.map((blog, index) => (
              <Col xs={24} sm={12} md={8} key={index}> 
                <Link to={`/blog/${blog.categories}/${blog.title}/full`}>
                  <Card hoverable className="blog-card">
                    <Card.Meta
                      description={
                        <div>
                          <h6 className="author-name">{blog.title}</h6>
                          <article className="blog-category">Published in: {blog.categories}</article>
                          <div className="author-info">
                            <img src={Logo} alt="Author Logo" width={10} height={10} className="author__photo" />
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
                </Link>
              </Col>
            ))}
          </Row>
        </div> 
      </Card>
    </div>
  );
};

export default BlogList;
