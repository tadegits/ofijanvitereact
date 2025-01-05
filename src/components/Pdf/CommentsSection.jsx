import React, { useState, useEffect } from 'react';
import { Input, Button, List, message } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ImageGallery.scss';
import API_BASE_URL from '../../Globals/apiConfig';

const CommentsSection = ({ context_type, context_id, parent_id, user_id, isLoggedIn, fname, lname}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch comments when the component mounts or when context_type or context_id changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/comments/${parent_id}/${context_type}`
        );
        if (response.status === 200) {
          setComments(response.data);
        }
      } catch (error) {
        message.error('Failed to load comments.');
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [context_type, context_id]);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/addcomments`, {
          context_type,
          context_id,
          parent_id,
          user_id,
          content: newComment,
        });

        if (response.status === 201) {
          const { posts } = response.data; // Destructure 'posts' from the response
          console.log('Response Data:', posts);

          setComments((prevComments) => [
            ...prevComments,
            {
              text: posts.content,  // The content is inside 'posts.content'
              user: `User ${posts.user_id}`,  // The user info is inside 'posts.user_id'
              id: posts.id,  // The id is inside 'posts.id'
            },
          ]);
          setNewComment(''); // Clear the input field after successful submission
        } else {
          message.error('Failed to add comment.');
        }
      } catch (error) {
        message.error(error.response?.data?.message || 'Failed to add comment.');
        console.error('Error adding comment:', error);
      } finally {
        setLoading(false);
      }
    } else {
      message.warning('Comment cannot be empty!');
    }
  };

  const handleTextEditorClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: 'You need to log in to comment',
        text: 'Would you like to log in?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login'; 
        }
      });
    }
  };

  return (
    <div style={{ marginTop: '32px', textAlign: 'left' }}>
      <h3>Comments</h3>
      {/* Display comments regardless of login status */}
      <List
        dataSource={comments}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <strong>{item.user?.name || ` ${fname} ${lname}`}:</strong> {item.content || item.text}
          </List.Item>
        )}
      />
      {/* Display the input field and allow interaction even when not logged in */}
      <Input
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onClick={handleTextEditorClick}  // Trigger SweetAlert on click
        onPressEnter={handleCommentSubmit}
        style={{ marginTop: '8px' }}
        disabled={loading}
      />
      <Button
        type="primary"
        onClick={handleCommentSubmit}
        style={{ marginTop: '8px' }}
        loading={loading}
      >
        Submit
      </Button>
    </div>
  );
};

export default CommentsSection;
