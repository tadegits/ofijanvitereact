import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../Globals/apiConfig';
const SingleBlog = () => {
  const { category, title } = useParams();
  const [blogs, setBlogData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postUri, setPostUri] = useState('');
 

  useEffect(() => {
    setPostUri(`${API_BASE_URL}/all_blogs`);
    axios.get(postUri)
      .then(response => {
        setBlogData(response.data.blogs);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [postUri]); 
  const blog = blogs.find((blog) => blog.categories === category && blog.title === title);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Category: {blog.categories}</p>
      <p>{blog.body}</p>
      <Link to={`/blog/${blog.categories}/${blog.title}/full`}>Read More</Link>
    </div>
  );
};

export default SingleBlog;
