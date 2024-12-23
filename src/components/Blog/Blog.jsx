import React from 'react';
import axios from 'axios';

import API_BASE_URL from '../../Globals/apiConfig';
import { useEffect, useState } from 'react';
import './Blogs.scss';
import Footer from '../../components/footer/footer'
import BlogActions from './BlogActions';
import Wrapper from '../wrapper/Wrapper';
import CategoryDiv from './CategoryDiv';
import { useNavigate } from 'react-router-dom';
import BlogLandingPage from './BlogLandingPage';

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postUri, setPostUri] = useState('');
  const navigate = useNavigate();
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

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };
  const handleClick = (category, title) => {
    navigate(`/blog/${category}/${id}`);
  };

  const renderPostContent = (post) => {
    const maxLength = 300;
    const displayContent = post.body.length > maxLength ? post.body.slice(0, maxLength) + '...' : post.body;
    return (
      <>
        <div className='blogs_content_single'>
          <div className='imageSpace'>
            <img height={'100%'} width={'100%'} src={'https://brandhub.co.nz/wp-content/uploads/2018/03/blog-page-placeholder-image.jpg'}
            />
          </div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <BlogActions blog={post} />
          <div className='footer'>
            <small>{post.created_at}</small>
            <button className='button-readmore' onClick={handleBack}>Back</button>
          </div>
        </div>
      </>
    );
  };
  return (
    <section className='blog'>
      <Wrapper className='blog__section'>
        <div className='blogs_side'>
        </div>
        <div className='blogs_content'>
          {/* <CategoryDiv/> */}
          <h3>Latest post</h3>

          <div className='underline'></div>
          {selectedPost ? (
            renderPostContent(selectedPost)
          ) : (
            blogData && blogData.map((blog, index) => {
              return (
                <div className='blogs_content_single' key={index}>
                  <h4>{blog.title}</h4>
                  <div className='author-card'>
                    <img src='data:image/jpeg;base64,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'
                      width={10} height={10} className='author-photo' />
                    <div className='author-info'>
                      <p className="author-name">Mr.{blog.author}</p>
                      <p className="author-role">Writer</p>
                    </div>
                  </div>

                  <p>{blog.body.slice(0, 300)}...</p>
                  <div className='imageSpace'>
                    <img height={'100%'} width={'100%'} src={'https://brandhub.co.nz/wp-content/uploads/2018/03/blog-page-placeholder-image.jpg'}
                    />
                  </div>
                  <BlogActions blog={blog} />
                  <div className='footer'>
                    <small>{blog.created_at}</small>
                    <button className='button-readmore' onClick={() => handleReadMore(blog)}>Read More</button>
                    <button onClick={handleClick(blog)}>
                      Go to Single Blog
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className='blogs_side'>
          <h3 className='title'>Popular Posts</h3>
          <div className='side_menu_head'>

            <div className='underline'></div>
            <hr></hr>
            <ul>
              <li>The importance of exit exams</li>
              <li>The purpose of exit exams</li>
            </ul>
          </div>

          <div className='side_menu_head'>
            <h6 className='title'>Related Topics</h6>
            <ul>
              <li>The importance of exit exams</li>
              <li>The purpose of exit exams</li>
            </ul>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Blog;
