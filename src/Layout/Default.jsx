import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Grade12 from "../components/Grade12/Grade12";
import Grade8 from "../components/Grade8/Grade8"
import Grade6 from "../components/Grade6/Grade6";
import ExitExam from "../components/ExitExam/ExitExam"
import Home from "../components/Home/Home"
import Footer from "../components/footer/footer"
import Dashboard from "../components/Dashboard/Dashboard"
import { BrowserRouter as Router, Route, Link, Routes, Navigate, Outlet } from 'react-router-dom';
import Hero from "../components/hero/Hero"
import CounterUpPage from "../components/counter/CounterUpPage"
import CompanySection from "../components/companySection/CompanySection"
import FeaturesSection from "../components/featuresSection/FeaturesSection"
import SignUpSection from "../components/SignUpSection/SignUpSection"
import Plans from "../components/PlanSection/PlanSection";
import Insraw from "../components/insraw/insraw"
import { useEffect, useState, } from "react";
import LoginSection from "../components/loginSection/LoginSection";
import SignUp from "../components/signUp/SingUp";
import BlogList from '../components/Blog/BlogList';
import SingleBlog from '../components/Blog/SingleBlog';
import FullBlog from '../components/Blog/FullBlog';
import Index from '../Seller/index';
import Blog from '../components/Blog/Blog';
import BlogReader from '../components/Blog/SingleBlog';
import API_BASE_URL from '../Globals/apiConfig';
import axios from 'axios';
const Default = () => {

  const [blogData, setBlogData] = useState([]);
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
  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Grade12" element={<Grade12 />} />
        <Route path="/Grade8" element={<Grade8 />} />
        <Route path="/Grade6" element={<Grade6 />} />
        <Route path="/ExitExam" element={<ExitExam />} />
        <Route path="/exit/:id" element={<ExitExam />} />
        <Route path="/Login" element={<LoginSection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route exact path="/ofijan_blogs" element={<Blog />} />
        <Route path="/blog/:category/:title" element={<BlogReader blogs={blogData} />} /> */}
        <Route path="/ofijan_blogs" element={<BlogList blogs={blogData} />} />
        <Route path="/blog/:category/:title" element={<SingleBlog blogs={blogData} />} />
        <Route path="/blog/:category/:title/full" element={<FullBlog blogs={blogData} />} />
      </Routes>

    </>
  )
}

export default Default
