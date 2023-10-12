import Navbar from "./components/navbar/Navbar"
import Hero from "./components/hero/Hero"
import CounterUpPage from "./components/counter/CounterUpPage"
import CompanySection from "./components/companySection/CompanySection"
import FeaturesSection from "./components/featuresSection/FeaturesSection"

function App() {

  return (
    <>
      <Navbar/>
      <Hero/>
      <CompanySection/> 
      
      <CounterUpPage/>

      <FeaturesSection/>
    </>
  )
}

export default App
