import React, { useEffect, useState } from 'react';
import { fetchBlogCategories } from './../../Globals/incomingData';
import './BlogCategories.scss';

const BlogCategories = ({ onSelectCategory }) => {
  const [blogCategories, setBlogCategories] = useState([]);

  useEffect(() => {
    const getBlogCategories = async () => {
      const fetchedCategories = await fetchBlogCategories();
      setBlogCategories(fetchedCategories);
    };
    getBlogCategories();
  }, []);

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="blog-categories">
      {blogCategories.map((category, index) => (
        <div
          key={index}
          className="category-item"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default BlogCategories;
