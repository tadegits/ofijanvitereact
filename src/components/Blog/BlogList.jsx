import React, { useState, useEffect} from 'react';
import { Layout, Card, Row, Col } from 'antd';
import './BlogList.scss';
import PlaceholderImage from '../../assets/pl.jpeg';
import BlogCategories from './BlogCategories';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';
const { Content } = Layout;

const BlogList = () => {

  const [blogs, setBlogData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postUri, setPostUri] = useState('');
 

  useEffect(() => {
    setPostUri(`${API_BASE_URL}/all_blogs`);
    axios.get(postUri)
      .then(response => {
        setBlogData(response.data.blogs);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [postUri]); 

  const [selectedCategory, setSelectedCategory] = useState();
 
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <div className='loading_container'>
      <div className="loading">

      </div>
    </div>;
  }

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.categories === selectedCategory)
    : blogs;

  const BlogCard = ({ blog }) => (
    <Col xs={24} sm={12} md={8} key={blog.id}>
      <Link to={`/blog/${blog.categories}/${blog.title}/full`}>
        <Card hoverable className="blog-card">
          <img
            src={blog.image ? `https://server.ofijan.com/storage/${blog.image}` : PlaceholderImage}
            alt={blog.title}
            className="blog-image"
            loading="lazy"
          />
          <Card.Meta
            description={
              <div className="blog-content">
                <h6 className="blog-title">{blog.title}</h6>
                <p className="blog-category">Published in: {blog.categories}</p>
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
  );

  return (
    <Layout className="blog-layout">
      <Content>
        <Card bordered={false}>
          <BlogCategories onSelectCategory={setSelectedCategory} />
          <Row gutter={[16, 16]} className="blog-row">
            {filteredBlogs.map((blog) => (
              <BlogCard blog={blog} />
            ))}
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default BlogList;
