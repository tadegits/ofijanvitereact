import React from 'react'
import { Card, Button, Row, Col, Divider, Avatar, Tag, Typography } from 'antd';
import './RelatedArticlesCard.scss';


const RelatedArticlesCard = ({ blogs, categories }) => {
    const { Title, Text } = Typography;
    const filteredBlogs = categories ? blogs.filter(blogs => blogs.categories === categories) : blogs;
  
    return (
        <div>
            <Title level={4}>Related Articles</Title>
            {blogs.map((relatedBlog) => (
                <Card style={{ width: 300 }} key={relatedBlog.id} title={relatedBlog.title}>
                    <p>{relatedBlog.summary}</p>
                    <Button type="link" onClick={() => handleRelatedBlogClick(relatedBlog.id)}>Read more</Button>
                </Card>
            ))}

        </div>
    )
}

export default RelatedArticlesCard
