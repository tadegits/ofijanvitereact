import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Blogs.scss';
import BlogActions from './BlogActions';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';

const FullBlog = ({ blogs }) => {
  const { category, title } = useParams();
  const [views, setViews] = useState(0);
  const [blog, setBlog] = useState(null);
  const [shareUrl, setShareUrl] = useState('');

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

 

  const handleShareOnSocialMedia = (platform) => {
    // Implement sharing logic for the specific social media platform
    // You can use a library like react-share to simplify this process
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='fullblog'>
      <div className='fullblog__content'>
        <h1 className='fullblog__title'>{blog.title}</h1>
        
        <p>Category: {blog.categories}</p>
        <div className='imageSpace'>
                  <img height={'100%'} width={'100%'} src={'https://brandhub.co.nz/wp-content/uploads/2018/03/blog-page-placeholder-image.jpg'}
                  />
                </div>
        <p>{blog.body}</p>
        <p>Views: {views}</p>
        <BlogActions blog={blog} />
      </div>
    </div>
  );
};

export default FullBlog;
