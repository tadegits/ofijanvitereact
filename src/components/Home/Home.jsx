import React, {useEffect, useState} from 'react'
import Hero from "../hero/Hero"
import CounterUpPage from "../counter/CounterUpPage"
import CompanySection from "../companySection/CompanySection"
import FeaturesSection from "../featuresSection/FeaturesSection"
import SignUpSection from "../SignUpSection/SignUpSection"
import Footer from "../footer/footer"
import Plans from "../PlanSection/PlanSection";
import Insraw from "../insraw/insraw"
import Testimonals from '../Testimonals/Testimonals'
import Navbar from '../navbar/Navbar'
import LNavbar from '../../logedin/navbar/LNavbar'
const Home = () => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false); 
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);
      setRole(parseInt(roleUser.user.role_id))
    }
  }, []);
  
  return (
    <>
      <Hero/>
      
      
     {/* <CounterUpPage/> */}
      <FeaturesSection/>
      <CompanySection/> 
      {/* <SignUpSection/>  */}
      <Testimonals/>
  
   
    </>
  )
}

export default Home
