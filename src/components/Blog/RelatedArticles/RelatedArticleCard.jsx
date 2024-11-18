import React from 'react';
import { Card, Button, Typography } from 'antd';
import './RelatedArticlesCard.scss';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const RelatedArticlesCard = ({ blogs, categories }) => {
    const filteredBlogs = categories ? blogs.filter(blog => blog.categories === categories) : blogs;

    return (
        <div className="related-articles-card">
            <Card title={<h6>Related Articles</h6>}>
                <Title level={3}></Title>
            <div className="related-articles-list">
                {filteredBlogs.map(relatedBlog => (
                    <div className='blogs' > <h5>{relatedBlog.title}</h5><Paragraph>{relatedBlog.summary}</Paragraph>
                    <Link to={`/blog/${relatedBlog.categories}/${relatedBlog.title}/full`} className="read-more-link">Read More</Link>
                </div>
                  
                ))}
                </div>
                </Card>
            </div>
        
    );
};

export default RelatedArticlesCard;
