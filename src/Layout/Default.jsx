import React from 'react'
import API_BASE_URL from '../Globals/apiConfig';
import Navbar from '../components/navbar/Navbar';
import Grade12 from "../components/Grade12/Grade12";
import Grade8 from "../components/Grade8/Grade8"
import Grade6 from "../components/Grade6/Grade6";
import ExitExam from "../components/ExitExam/ExitExam"
import LExitExam from '../logedin/ExitExam/LExitExam';
import Home from "../components/Home/Home"
import Dashboard from "../components/Dashboard/Dashboard"
import { BrowserRouter as Router, Route, Link, Routes, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState, } from "react";
import LoginSection from "../components/loginSection/LoginSection";
import SignUp from "../components/signUp/SingUp";
import BlogList from '../components/Blog/BlogList';
import SingleBlog from '../components/Blog/SingleBlog';
import FullBlog from '../components/Blog/FullBlog';
// import Gezi from '../Seller/pages/EducationLevel/EducationLevel';
import Seller from '../Seller';
import Plate from '../components/QuestionPlate/Plate';
import CoC from '../components/CoC/CoC';
import EasyExam from '../components/EasyExam/Index';
import axios from 'axios';
import Pdf from '../components/Pdf';
import DisplayPdf from '../components/Pdf/DisplayPdf';
import DisplayBluePrint from '../components/Pdf/DisplayBluePrint';
import BluePrint from '../components/Pdf/BluePrint';
import ImageGallery from '../components/Pdf/ImageGallery';
import TestMePlate from '../logedin/ExitExam/LQuestionPlate/TestMePlate';
import DepartmentList from '../components/Department/DepartmentList.jsx';

import Privacy from '../components/Privacy';
import AboutUs from '../components/footer/AboutUs';
import TermsOfService from '../components/footer/TermsOfService';
import StudyPlate from '../logedin/ExitExam/LQuestionPlate/StudyPlate';
import ExamResults from '../components/ExitExam/ExamResult';
import ExamResultsUgr from '../components/ExitExam/ExamResultUgr';
import Footer from '../components/footer/footer';
import ExamPreview from '../components/ExamPriview/index.jsx';
import Forgotpassword from '../components/loginSection/ForgotPassword';
import UpdatePaymentStatus from '../Globals/UpdatePaymentStatus.jsx';
const Default = () => {
  
 
  return (
    <>
      <Routes>
      <Route path='/update_payment_statuscccc' element={<UpdatePaymentStatus/>}/>
        <Route path="/privacy" element={<Privacy />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/termsofservice' element={<TermsOfService />} />
        <Route path='/terms-of-service' element={<TermsOfService/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/CoC" element={<CoC />} />
        <Route path="/Grade12" element={<Grade12 />} />
        <Route path="/Grade8" element={<Grade8 />} />
        <Route path="/Grade6" element={<Grade6 />} />
        <Route path="/easyexam" element={<EasyExam />} />
        <Route path="ofijan_model_exams" element={<DepartmentList />} />
        <Route path="/ExitExam" element={<ExitExam />} />
        <Route path='/exam/details/:examId' element={<ExamPreview />} />
        <Route path="/Exit_Exam" element={<LExitExam />} />
        <Route path="/exit/:id" element={<ExitExam />} />
        <Route path="/Login" element={<LoginSection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/2015_exit_pdfs" element={<Pdf />} />
        <Route path="/model-exam" element={<Pdf />} />
        <Route path="/2015MosheExitExam" element={<Pdf />} />
        <Route path="/exit-exam/:id/1" element={<DisplayPdf />} />
        <Route path="/exit-exam/:id/:imageindex" element={<DisplayPdf />} />
        <Route path="/image-gallery/:id" element={<ImageGallery />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/model-exam/:id/1" element={<DisplayPdf />} />
        <Route path="/examresults/:id" element={<ExamResults />} />
        <Route path="/examresultsugr/:id" element={<ExamResultsUgr />} />
        <Route path="/display-exam/:id/1" element={<DisplayPdf />} />
        <Route path="/display-exam/:id" element={<DisplayBluePrint />} />
        <Route path="/display-pdf/:id" element={<DisplayBluePrint />} />
        <Route path="/blueprint" element={<BluePrint />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route exact path='/gezi' element={<Gezi/>}/> */}

        <Route exact path='/ofijan_question_plate/:ofin_id' element={<Plate />} />
        <Route exact path='/ofijan_exam_plate/testmode/:ofin_id' element={<Plate />} />
        <Route exact path='/ofijan_exam_plate/studymode/:ofin_id' element={<StudyPlate />} />

        <Route path="/seller" element={<Seller />} />
        {/* <Route exact path='/gezi' element={<Gezi />} /> */}
        {/* <Route path='/seller' element={<Seller />} /> */}
        {/* <Route exact path="/ofijan_blogs" element={<Blog />} />
        <Route path="/blog/:category/:title" element={<BlogReader blogs={blogData} />} /> */}
        <Route path="/ofijan_blogs" element={<BlogList />} />
        <Route path="/blog/:category/:title" element={<SingleBlog/>} />
        <Route path="/blog/:category/:title/full" element={<FullBlog />} />
      </Routes>
      {/* <Footer/> */}
    </>
  )
}

export default Default
