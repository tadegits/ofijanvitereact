import React, { useState } from 'react';
import { Input, Button, Select, message } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import './FloatingCommentButton.scss';

const { Option } = Select;

const FloatingCommentButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState('system');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleTypeChange = (value) => {
    setCommentType(value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      message.success(`Your comment on ${commentType} was submitted!`);
      setComment('');
      setIsExpanded(false);
    } else {
      message.error('Please write a comment before submitting.');
    }
  };

  return (
    <div className="floating-comment-container">
      <div
        className={`floating-button ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CommentOutlined />
      </div>

      {isExpanded && (
        <div className="comment-form">
          <Select
            defaultValue="system"
            onChange={handleTypeChange}
            style={{ marginBottom: '8px' }}
          >
            <Option value="system">Overall System</Option>
            <Option value="question">Specific Question</Option>
          </Select>
          <Input.TextArea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
            rows={4}
          />
          <Button type="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default FloatingCommentButton;
