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

  useEffect(() => {
    if (blog) {
      const url = `${window.location.origin}/${blog.categories}/${blog.title}`;
      setShareUrl(url);
    }
  }, [blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    // Show a success message or perform any other action
  };

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
        <p>{blog.body}</p>
        <p>Views: {views}</p>

        <BlogActions blog={blog} />

        <div className='share-buttons'>
          <button onClick={handleCopyLink}>Copy Link</button>
          <button onClick={() => handleShareOnSocialMedia('facebook')}>Share on Facebook</button>
          <button onClick={() => handleShareOnSocialMedia('twitter')}>Share on Twitter</button>
          {/* Add more social media buttons as needed */}
        </div>

        {/* Modal component to display social media options and copy link */}
        <div className='modal'>
          <div className='modal-content'>
            <h2>Share Blog</h2>
            <p>Share this blog on social media:</p>
            <button onClick={() => handleShareOnSocialMedia('facebook')}>Facebook</button>
            <button onClick={() => handleShareOnSocialMedia('twitter')}>Twitter</button>
            {/* Add more social media buttons as needed */}
            <p>Or copy the link:</p>
            <input type='text' value={shareUrl} readOnly />
            <button onClick={handleCopyLink}>Copy Link</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
