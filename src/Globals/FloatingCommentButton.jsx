import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { CommentOutlined, MinusCircleOutlined, MessageOutlined, SendOutlined, DownOutlined } from '@ant-design/icons';
import './FloatingCommentButton.scss';
import API_BASE_URL from './apiConfig';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FloatingCommentButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState('0');
  const [userFName, setUserFName] = useState('Anonymous');
  const [userLName, setUserLName] = useState(' ');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // State to track typing
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true); // Track if we're at the bottom
  const navigate = useNavigate();

  // Fetch user details if logged in
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser !== null) {
      setIsLoggedin(true);
      const userLogged = JSON.parse(loggedUser);
      setUserId(userLogged.user.id);
      setUserFName(userLogged.user.fname);
      setUserLName(userLogged.user.lname);
    }
  }, []);

  // Fetch comments from the API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/all_comments`);
        const data = await response.json();
        setComments(data); // Ensure data has correct structure
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, []);

  // Scroll to the bottom of the comments container when comments are updated or component renders
  useEffect(() => {
    const commentsContainer = document.querySelector('.comments-container');
    if (commentsContainer) {
      commentsContainer.scrollTop = commentsContainer.scrollHeight;
      setIsScrolledToBottom(true); // Set flag to indicate we're at the bottom
    }
  }, [comments]);

  // Handle comment input change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setIsTyping(true); // Show typing when user types
    setTimeout(() => setIsTyping(false), 1000); // Hide typing after 1 second
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const context_type = 'default'; // Use your desired context type
        const context_id = '1'; // Use your desired context id
        const parent_id = '0'; // Use your desired parent id

        const response = await axios.post(`${API_BASE_URL}/addcomments`, {
          context_type,
          context_id,
          parent_id,
          user_id: userId,
          content: comment,
        });

        if (response.status === 201) {
          const { posts } = response.data;

          setComments((prevComments) => [
            ...prevComments,
            {
              id: posts.id,
              content: posts.content,
              username: posts.user_id === userId ? 'You' : 'User',
            },
          ]);

          setComment(''); // Reset comment input after submitting
        } else {
          message.error('Failed to add comment.');
        }
      } catch (error) {
        message.error(error.response?.data?.message || 'Failed to add comment.');
        console.error('Error adding comment:', error);
      }
    } else {
      message.warning('Comment cannot be empty!');
    }
  };

  // Minimize the modal
  const handleMinimize = () => {
    setIsMinimized(true);
    setIsExpanded(false);
  };

  // Expand the modal
  const handleExpand = () => {
    setIsMinimized(false);
    setIsExpanded(true);
  };

  // Navigate to login page
  const handleLogin = () => {
    navigate('/login');
  };

  // Scroll to bottom when button is clicked
  const handleScrollToBottom = () => {
    const commentsContainer = document.querySelector('.comments-container');
    if (commentsContainer) {
      commentsContainer.scrollTop = commentsContainer.scrollHeight;
      setIsScrolledToBottom(true);
    }
  };

  return (
    <div className="floating-comment-container">
      {/* Floating comment button */}
      <div
        className={`floating-button ${isExpanded || isMinimized ? 'active' : ''}`}
        onClick={isMinimized ? handleExpand : () => setIsExpanded(!isExpanded)}
      >
        <CommentOutlined />
      </div>

      {/* Modal content when expanded */}
      {isExpanded && !isMinimized && (
        <div className="comment-modal">
          <div className="modal-top-bar">
            <h3 className="modal-title">Chat with Ofijan Family</h3>
          </div>

          {/* Display comments */}
          <div className="comments-container">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`comment-bubble ${comment.username === 'You' ? 'user-comment' : 'other-comment'}`}
              >
                <div className="comment-username">{comment?.user?.fname}</div>
                <div className="comment-text">{comment.content}</div>
              </div>
            ))}
          </div>

          {/* Typing indicator */}
          {isTyping && (
            <div className="typing-indicator">
              {isLoggedin ? `${userFName} typing...` : 'Anonymous User typing...'}
            </div>
          )}

          {/* Scroll-to-bottom button */}
          {!isScrolledToBottom && (
            <div className="scroll-to-bottom-btn" onClick={handleScrollToBottom}>
              <DownOutlined />
            </div>
          )}

          {/* Comment input form */}
          <div className="comment-form">
            <Input.TextArea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Type your message..."
              rows={3}
            />
            {isLoggedin ? (
              <SendOutlined className="submit-icon" onClick={handleCommentSubmit} />
            ) : (
              <Button type="primary" onClick={handleLogin}>Login to Comment</Button>
            )}
          </div>
        </div>
      )}

      {/* Minimized state (floating button only) */}
      {isMinimized && (
        <div className="minimized-modal" onClick={handleExpand}>
          <SendOutlined />
        </div>
      )}
    </div>
  );
};

export default FloatingCommentButton;
