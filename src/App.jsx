

import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import Default from "./Layout/Default";
import Loged from "./Layout/Loged";
import Home from "./components/Home/Home"
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
        <Routes>
        <Route path ="/" element={<Home/>}/>
        </Routes>
      </>
    )
  }
}
export default App
