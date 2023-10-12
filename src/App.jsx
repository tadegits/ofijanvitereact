
import NavBar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero"
import CounterUpPage from "./components/counter/CounterUpPage"
import CompanySection from "./components/companySection/CompanySection"
import FeaturesSection from "./components/featuresSection/FeaturesSection"
import SignUpSection from "./components/SignUpSection/SignUpSection"
import SiteSection from "./components/siteSection/SiteSection";
function App() {

  return (
    <>
      <NavBar/>
      <Hero/>
      <CompanySection/> 
      <CounterUpPage/>
      <FeaturesSection/>
      <SignUpSection/> 
      <SiteSection/>
    </>
  )
}

export default App
