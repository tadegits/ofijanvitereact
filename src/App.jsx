import Navbar from "./components/navbar/Navbar"
import Hero from "./components/hero/Hero"
import CounterUpPage from "./components/counter/CounterUpPage"
import CompanySection from "./components/companySection/CompanySection"
import FeaturesSection from "./components/featuresSection/FeaturesSection"
// import SignUpSection from "./components/SignUpSection/SignUpSection"

function App() {

  return (
    <>
      <Navbar/>
      <Hero/>
      <CompanySection/> 
      <CounterUpPage/>
      <FeaturesSection/>
      {/* <SignUpSection/> */}
    </>
  )
}

export default App
