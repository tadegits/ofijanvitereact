import React, { useState } from 'react';
import { Input, Button, List, message } from 'antd';
import axios from 'axios';
import './ImageGallery.scss';

const CommentsSection = ({ context_type, context_id, parent_id, user_id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      setLoading(true);
      try {
        const response = await axios.post('https://server.ofijan.com/api/addcomments', {
          context_type,
          context_id,
          parent_id,
          user_id,
          content: newComment, // Use `content` from the state
        });

        if (response.status === 200) {
          const { data } = response;
          setComments([...comments, { text: data.content, user: `User ${data.user_id}`, id: data.id }]);
          setNewComment('');
          message.success('Comment added successfully!');
        }
      } catch (error) {
        message.error('Failed to add comment. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      message.warning('Comment cannot be empty!');
    }
  };

  return (
    <div style={{ marginTop: '32px', textAlign: 'left' }}>
      <h3>Comments</h3>
      <List
        dataSource={comments}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <strong>{item.user}:</strong> {item.text}
          </List.Item>
        )}
      />
      <Input
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
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
