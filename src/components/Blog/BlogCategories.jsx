import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { fetchBlogCategories } from './../../Globals/incomingData';
const { Panel } = Collapse;

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
        <Collapse accordion>
            {blogCategories.map((category, index) => (
                <Panel header={category} key={index} onClick={() => handleCategoryClick(category)}>
                    {/* {category} */}
                </Panel>
            ))}
        </Collapse>
    );
};

export default BlogCategories;
