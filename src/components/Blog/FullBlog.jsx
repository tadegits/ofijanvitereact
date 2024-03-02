import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogList.scss';
import BlogActions from './BlogActions';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';
import TopicsCard from './Topics/TopicsCard';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Divider, Avatar, Tag, Typography } from 'antd';
import { LeftCircleOutlined, EyeOutlined } from '@ant-design/icons';
import RelatedArticlesCard from './RelatedArticles/RelatedArticleCard';

const FullBlog = ({ blogs }) => {
  const { category, title } = useParams();
  const [views, setViews] = useState(0);
  const [blog, setBlog] = useState(null);
  const { Title, Text } = Typography;

  useEffect(() => {
    const fetchBlog = () => {
      const foundBlog = blogs.find((blog) => blog.categories === category && blog.title === title);
      setBlog(foundBlog);
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

  const handleViewCount = () => {

  }

  const handleShareOnSocialMedia = (platform) => {
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  if (!blog) {
    return <div>Blog not found</div>;
  }
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="blog-list-container">
      <Card title="Ofijan Blogs">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <div className='blog-body-container'>
              <div className="blog__detail">
                <div className="first__row">
                  <Button className='back__button' onClick={goBack}>
                    <LeftCircleOutlined /> Back
                  </Button>
                  <TopicsCard />
                </div>
                <div className="second__row">
                  <Card
                    style={{ width: 800 }}
                    className="card-content"
                  >
                    <h3>{blog.title}</h3>
                    <p>Category: <Tag color="blue">{blog.category}</Tag></p>
                    <div className='author-info'>
                      {/* <Avatar size={32} src={blog.author.avatar} /> */}
                      <Text strong>{blog.author.name}</Text>
                    </div>
                    {/* <img alt="blog content" src={blog.contentImageUrl} style={{ width: '100%' }} /> */}
                    {/* <Title level={4}>Summary</Title> */}
                    {/* <p>{blog.summary}</p> */}
                    {/* <Title level={4}>Content</Title> */}
                    <article><p dangerouslySetInnerHTML={{ __html: blog.body }} /></article> 
                    <Divider />
                    <div className='blog-actions'>
                      <Button icon={<EyeOutlined />} onClick={handleViewCount}>{views} Views</Button>
                      <BlogActions blog={blog} />
                    </div>
                    <Divider />
                  </Card>
                </div>
                <div className="third__row">
                  <RelatedArticlesCard blogs={blogs}/>
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
      <link rel="canonical" href={`https://yourwebsite.com/${blog.category}/${blog.title}`} />
    </div>
  );
};

export default FullBlog;
