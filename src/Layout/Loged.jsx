import React from 'react'
import LNavbar from '../logedin/navbar/LNavbar'
import LFooter from "../logedin/footer/footer"
import LExitExam from "../logedin/ExitExam/ExitExam"
import Dashboard from "../components/Dashboard/Dashboard"

import { BrowserRouter as Router, Route, Link, Routes, Navigate, Outlet } from 'react-router-dom';
const Loged = () => {
  return (
    <>
      <LNavbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ExitExam" element={<LExitExam />} />
        </Routes>
        <LFooter />
    </>
  )
}

export default Loged
