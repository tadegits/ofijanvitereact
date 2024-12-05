import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import './ImageGallery.scss';
const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, user: 'User', id: comments.length }]);
      setNewComment('');
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
      />
      <Button type="primary" onClick={handleCommentSubmit} style={{ marginTop: '8px' }}>
        Submit
      </Button>
    </div>
  );
};

export default CommentsSection;
