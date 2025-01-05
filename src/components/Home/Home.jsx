import React, { useEffect, useState } from 'react'
import Hero from "../hero/Hero"
import FeaturesSection from "../featuresSection/FeaturesSection"
import Pdf from '../Pdf';
import ExitExam from '../ExitExam/ExitExam';
import ContactSection from '../contactSection/ContactSection';
import DepartmentList from '../Department/DepartmentList'
import API_BASE_URL from '../../Globals/apiConfig';
import Footer from '../footer/footer';
import axios from 'axios';
const Home = () => {
  const [user, setUser] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);

    }
  }, []);
  return (
    <>
      <Hero />
      {/* <Footer/> */}
      {/* <Pdf /> */}
      {/* <DepartmentList /> */}
      {/* <ExitExam /> */}
      {/* <FeaturesSection /> */}
      <ContactSection />
    </>
  )
}
export default Home