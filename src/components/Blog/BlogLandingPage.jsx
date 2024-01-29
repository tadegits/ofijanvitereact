import React from 'react';
import { Layout,  Card } from 'antd';
import './BlogLandingPage.scss';
const { Content } = Layout;

const BlogLandingPage = () => {
  return (
    <Layout>
      <Content>
        <Card
          title="Welcome to My Blog"

        />
        <Card title="Latest Posts">
          <p>Post 1 content</p>
          <p>Post 2 content</p>
          <p>Post 3 content</p>
        </Card>
      </Content>
    </Layout>
  );
};

export default BlogLandingPage;