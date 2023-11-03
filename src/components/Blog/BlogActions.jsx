import React from 'react'
import './BlogActions.scss'
import { FaThumbsUp, FaShare, FaComment } from 'react-icons/fa';
const BlogActions = (blog) => {
  return (
    <div className='blog-actions'>
                  <button className='button-like'>
                    <FaThumbsUp />
                    &nbsp;  Like  {blog.likes}
                  </button>
                  <button className='button-share'>
                    <FaShare />
                    &nbsp;    Share  {blog.shares}
                  </button>
                  <button className='button-comment'>
                    <FaComment />
                    &nbsp;    Comment  {blog.comments}
                  </button>

    </div>
  )
}

export default BlogActions
