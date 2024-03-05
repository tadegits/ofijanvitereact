

import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import Default from "./Layout/Default";
import Loged from "./Layout/Loged";
import Seller from "./Seller"
import NetworkStatus from "./network/NetworkStatus";
import Footer from './components/footer/footer';
import Navbar from "./components/navbar/Navbar";
import LNavbar from "./logedin/navbar/LNavbar";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserRouter as Router, Route, Link, Routes, Navigate, Outlet } from 'react-router-dom';
function App() {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const roleUser = JSON.parse(loggedInUser);
      const foundUser = JSON.stringify(loggedInUser);
      setUser(foundUser);
      setRole(parseInt(roleUser.user.role_id))
    }
  }, []);
  const firebaseConfig = {
    apiKey: "AIzaSyApf7vMHzF0F8XdCS-OdnA43GAk-BAItG0",
    authDomain: "ofijan-exams.firebaseapp.com",
    projectId: "ofijan-exams",
    storageBucket: "ofijan-exams.appspot.com",
    messagingSenderId: "291201379155",
    appId: "1:291201379155:web:ac8285c04bb09e6fc1cfa6",
    measurementId: "G-S09KVVNP50"
  };
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  console.log(role)
  if (user) {
    if (role === 2 || role === 3) {
      return (
        <>  
          <Loged />
          <Footer />
        </>
      )
    }

  }
  else {
    return (
      <>
        <Default />
        <Footer />
      </>
    )
  }

}
export default App
