import React, { useState } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import './BlogList.scss';
import PlaceholderImage from '../../assets/aplus.jpg'; // Add a placeholder image
import BlogCategories from './BlogCategories';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import API_BASE_URL from '../../Globals/apiConfig';
const { Content } = Layout;

const BlogList = ({ blogs }) => {
  const [selectedCategory, setSelectedCategory] = useState();

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.categories === selectedCategory)
    : blogs;
  console.log(filteredBlogs);
  return (
    <section className="blog">
      <title>Blog</title>
      <meta property="og:title" content="Blog" />
      <meta property="og:description" content="Ofijan Blogs" />
      <meta property="og:image" content="withmoto.png" />
      <meta property="og:url" content="https://ofijan.com/ofijan_blogs" />
      <Wrapper className="blog__section">
        <div className="blog-list-container">
          <Card title="Ofijan Blogs">
            <div className="blog-body-container">
              <BlogCategories onSelectCategory={setSelectedCategory} />
              <Row gutter={[16, 16]} className="blog-row">
                {filteredBlogs.map((blog) => (
                  <Col xs={24} sm={12} md={8} key={blog.id}>
                    <Link to={`/blog/${blog.categories}/${blog.title}/full`}>
                      <Card hoverable className="blog-card">
                        <div className="blog-image-container">
                          <img
                            src={blog.image ? `https://server.ofijan.com/storage/${blog.image}` : PlaceholderImage}
                            alt={blog.title}
                            className="blog-image"
                          />

                        </div>

                        <Card.Meta
                          description={
                            <div>
                              <h6 className="blog-title">{blog.title}</h6>
                              <p className="blog-category">Published in: {blog.categories}</p>
                              <div className="author-info">
                                <div className="author-details">
                                  <p className="author-name">
                                    {blog.author && blog.author !== "undefined"
                                      ? blog.author
                                      : "Anonymous"}
                                  </p>
                                  <p className="author-role">Writer</p>
                                </div>
                              </div>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: blog.body.slice(0, 100),
                                }}
                                className="blog-body"
                              />
                            </div>
                          }
                        />
                        <Link
                          to={`/blog/${blog.categories}/${blog.title}/full`}
                          className="read-more-link"
                        >
                          Read More
                        </Link>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </div>
      </Wrapper>
    </section>
  );
};

export default BlogList;
