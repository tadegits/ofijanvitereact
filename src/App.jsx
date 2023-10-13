
import NavBar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero"
import CounterUpPage from "./components/counter/CounterUpPage"
import CompanySection from "./components/companySection/CompanySection"
import FeaturesSection from "./components/featuresSection/FeaturesSection"
import SignUpSection from "./components/SignUpSection/SignUpSection"
import Grade12 from "./components/Grade12/Grade12";
import Grade8 from "./components/Grade8/Grade8"
import Grade6 from "./components/Grade6/Grade6";
import ExitExam from "./components/ExitExam/ExitExam"
import Home from "./components/Home/Home"
import Footer from "./components/footer/footer"
import Plans from "./components/PlanSection/PlanSection";
import Insraw from "./components/insraw/insraw"
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <NavBar/>
      <Routes>  
          <Route path="/" element={<Home/>} />
          <Route path="/Grade12" element={<Grade12/>} />
          <Route path="/Grade8" element={<Grade8/>} />
          <Route path="/Grade6" element={<Grade6/>} />
          <Route path="/ExitExam" element={<ExitExam/>} />
      </Routes>
     <Footer/>
    </>
  )
}

export default App
