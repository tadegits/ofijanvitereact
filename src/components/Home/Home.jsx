import React from 'react'
import Hero from "../hero/Hero"
import CounterUpPage from "../counter/CounterUpPage"
import CompanySection from "../companySection/CompanySection"
import FeaturesSection from "../featuresSection/FeaturesSection"
import SignUpSection from "../SignUpSection/SignUpSection"
import Footer from "../footer/footer"
import Plans from "../PlanSection/PlanSection";
import Insraw from "../insraw/insraw"
const Home = () => {
  return (
    <>
       <Hero/>
      <CompanySection/> 
      <CounterUpPage/>
      <FeaturesSection/>
      <SignUpSection/> 
      <Plans/>
      <Insraw/>
      
    </>
  )
}

export default Home