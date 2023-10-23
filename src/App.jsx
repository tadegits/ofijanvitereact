

import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import Default from "./Layout/Default";
import Loged from "./Layout/Loged";
// import Navbar from "./components/navbar/Navbar";
// import Grade12 from "./components/Grade12/Grade12";
// import Grade8 from "./components/Grade8/Grade8"
// import Grade6 from "./components/Grade6/Grade6";
// import ExitExam from "./components/ExitExam/ExitExam"
// import Home from "./components/Home/Home"
// import LoginSection from "./components/loginSection/LoginSection";
// import SignUp from "./components/signUp/SingUp";
// import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Link, Routes, Navigate, Outlet } from 'react-router-dom';
function App() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  if (user) {
    return (
      <>
        <Loged/>
      </>
    )
  }
  else {
    return (
      <>
        <Default/>
      </>
    )
  }

  
}
export default App
