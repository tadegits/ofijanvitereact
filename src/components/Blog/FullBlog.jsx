import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BlogList.scss';
import BlogActions from './BlogActions';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';
import { Card, Button, Row, Col, Divider, Tag, Typography } from 'antd';
import { LeftCircleOutlined, EyeOutlined } from '@ant-design/icons';
import RelatedArticlesCard from './RelatedArticles/RelatedArticleCard';
import BlogCategories from './BlogCategories';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const { Text } = Typography;

const FullBlog = ({ blogs }) => {
  const { category, title } = useParams();
  const [views, setViews] = useState(0);
  const [blog, setBlog] = useState(null);
const location  = useLocation();
  useEffect(() => {
    const fetchBlog = () => {
      if (blogs && category && title) {
        const foundBlog = blogs.find((blog) => blog.categories === category && blog.title === title);
        setBlog(foundBlog);
      }
    };
  
    fetchBlog();
  }, [blogs, category, title]);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        if (blog) {
          const response = await axios.get(`${API_BASE_URL}/getViewCount/${blog.id}`);
          setViews(response.data.count);
        }
      } catch (error) {
        console.error('Error fetching view count:', error);
      }
    };

    fetchViewCount();
  }, [blog]);

  useEffect(() => {
    if (blog) {
      axios
        .post(`${API_BASE_URL}/updateViewCount`, { itemId: blog.id, views: views + 1 })
        .then((response) => {
          console.log('View count updated successfully');
        })
        .catch((error) => {
          console.error('Error updating view count:', error);
        });
    }
  }, [blog, views]);
  const trimText = (text) => {
    const words = text.split(' ');
    if (words.length > 100) {
      return words.slice(0, 100).join(' ') + '...';
    }
    return text;
  };
  const handleViewCount = () => {
  };

  const navigateBack = () => {
    window.history.back(); 
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  const relatedArticles = blogs.filter((item) => item.categories === blog.categories && item.title !== blog.title);

  return (
    <div className="blog-list-container">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={trimText(blog.body)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.title} />
        <meta property="og:image" content="../../" />
        <meta property="og:url" content={location.pathname} />
      </Helmet>
      <Card title="Ofijan Blogs" extra={<a href='/ofijan_blogs'>
        <Button className='back__button' >
                    <LeftCircleOutlined /> Back
                  </Button></a>}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <div className='blog-body-container'> 
              <div className="blog__detail">
                <div className="second___row">
                  <Card  className="card-content">
                    <h1>{blog.title}<div>&#x1F389;</div></h1>
                    <p>Category: <Tag color="blue">{blog.categories}</Tag></p>
                    <div className='author-info'>
                      <Text strong>{blog.author.name}</Text>
                    </div>
                    <article className='blogme__body' dangerouslySetInnerHTML={{ __html:blog.body }}></article><Divider />
                    <div className='blog-actions'>
                      <Button icon={<EyeOutlined />} onClick={handleViewCount}>{views} </Button>
                      <BlogActions blog={blog} />
                    </div>
                    <Divider />
                  </Card>
                </div>
                <div className="third__row">
                  <RelatedArticlesCard blogs={relatedArticles} />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div className='blogs_side'>
              {/* Side content, e.g., recent posts, popular tags, etc. */}
            </div>
          </Col>
        </Row>
      </Card>
      {/* Add meta tags for SEO */}
      <meta charSet="UTF-8" />
      <title>{blog.title}</title>
      <meta name="description" content={blog.summary} />
      <link rel="canonical" href={location.pathname} />
      <a href={location.pathname}>Read more</a>
    </div>
  );
};

export default FullBlog;
