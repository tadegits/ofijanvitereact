import React, { useEffect, useState } from 'react'
import Hero from "../hero/Hero"
import FeaturesSection from "../featuresSection/FeaturesSection"
import Pdf from '../Pdf';
import ExitExam from '../ExitExam/ExitExam';
import ContactSection from '../contactSection/ContactSection';
import DepartmentList from '../Department/DepartmentList'
import API_BASE_URL from '../../Globals/apiConfig';
import axios from 'axios';
const Home = () => {
  const [user, setUser] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postUri, setPostUri] = useState('');
  const [departmentURI, setDepartmentUri] = useState('');
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);

    }
  }, []);

  useEffect(() => {
    setDepartmentUri(`${API_BASE_URL}/departments`);
    axios.get(departmentURI)
      .then(response => {
        setDepartment(response.data);  
      })
      .catch(error => {
        console.error('Error fetching department data:', error);
      });
  }, [departmentURI]); 
  return (
    <>
      <Hero />
      <Pdf />
      <DepartmentList departments={department} />
      {/* <ExitExam /> */}
      <FeaturesSection />
      <ContactSection />
    </>
  )
}
export default Home