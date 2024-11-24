import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/footer';
import Grade12 from "../components/Grade12/Grade12";
import Grade8 from "../components/Grade8/Grade8"
import Grade6 from "../components/Grade6/Grade6";
import ExitExam from "../components/ExitExam/ExitExam"
import Home from "../components/Home/Home"
import LExitExam from "../logedin/ExitExam/LExitExam.jsx"
import Dashboard from "../components/Dashboard/Dashboard"
import LoginSection from "../components/loginSection/LoginSection";
import BlogList from '../components/Blog/BlogList.jsx';
import SingleBlog from '../components/Blog/SingleBlog.jsx';
import FullBlog from '../components/Blog/FullBlog.jsx';
import TestMePlate from '../logedin/ExitExam/LQuestionPlate/TestMePlate.jsx';
import StudyPlate from '../logedin/ExitExam/LQuestionPlate/StudyPlate.jsx';
import EasyExamPlate from '../components/EasyExam/EasyExamPlate.jsx';
import EasyExam from '../components/EasyExam/EasyExam.jsx';
import API_BASE_URL from '../Globals/apiConfig.jsx';
import axios from 'axios';
import Result from '../components/Result'

import Pdf from '../components/Pdf';
import DisplayPdf from '../components/Pdf/DisplayPdf.jsx';
import DisplayBluePrint from '../components/Pdf/DisplayBluePrint';
import BluePrint from '../components/Pdf/BluePrint.jsx';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, Outlet } from 'react-router-dom';
import '../Seller/App.css';
import Plate from '../logedin/ExitExam/LQuestionPlate/Plate.jsx';
import Privacy from '../components/Privacy';
import AboutUs from '../components/footer/AboutUs.jsx';
import TermsOfService from '../components/footer/TermsOfService.jsx';
import ExamResults from '../components/ExitExam/ExamResult.jsx';
const Loged = () => {
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
  const currentPath = location.pathname;
  return (
    <>

       {/* <Navbar /> */}
      <Routes>
        <Route path='/privacy' element={<Privacy/>} />
         <Route path='/about-us' element={<AboutUs/>}/>
         <Route path='/termsofservice' element={<TermsOfService/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/easyexam" element={<EasyExam />} />
        <Route path="/easy_exam_plate/:ofin_id" element={<EasyExamPlate />} />
        <Route path="/examresults/:id" element={<ExamResults />} />
        <Route path="/Grade12" element={<Grade12 />} />
        <Route path="/Grade8" element={<Grade8 />} />
        <Route path="/Grade6" element={<Grade6 />} />
        <Route path="/ExitExam" element={<ExitExam />} />
        <Route path="/exit/:id" element={<ExitExam />} />
        <Route path="/Login" element={<LoginSection />} />
        <Route path="/Exit_Exam" element={<LExitExam />} />
        <Route path="/2015_exit_pdfs" element={<Pdf />} />
        <Route path="/model-exam" element={<Pdf />} />
        <Route path="/2015MosheExitExam" element={<Pdf />} />
        <Route path="/model-exam/:id/1" element={<DisplayPdf />} />
        <Route path="/exit-exam/:id/1" element={<DisplayPdf />} />
        <Route path="/display-exam/:id/1" element={<DisplayPdf />} />
        <Route path="/display-pdf/:id" element={<DisplayBluePrint />} />
        <Route path="/display-exam/:id" element={<DisplayBluePrint />} />
        <Route path="/blueprint" element={<BluePrint />} />
        <Route exact path='/ofijan_question_platel/:ofin_id' element={<Plate />} />
        <Route path="/ofijan_blogs" element={<BlogList blogs={blogData} />} />
        <Route path="/blog/:category/:title" element={<SingleBlog blogs={blogData} />} />
        <Route path="/blog/:category/:title/full" element={<FullBlog blogs={blogData} />} />
        <Route exact path='/ofijan_question_plate/:ofin_id' element={<Plate />} />
        <Route exact path='/ofijan_exam_plate/testmode/:ofin_id' element={<TestMePlate />} />
        <Route exact path='/ofijan_exam_plate/studymode/:ofin_id' element={<StudyPlate />} />
        <Route exact path='/my_results' element={<Result/>} />
      </Routes>
      {/* <Footer/> */}
    </>
  )
}
export default Loged
