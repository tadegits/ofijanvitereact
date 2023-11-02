import React from 'react'

const index = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Grade12" element={<Grade12 />} />
          <Route path="/Grade8" element={<Grade8 />} />
          <Route path="/Grade6" element={<Grade6 />} />
          <Route path="/ExitExam" element={<ExitExam />} />
          <Route path="/exit/:id" element={<ExitExam />} />
          <Route path="/Login" element={<LoginSection />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />  
        </Routes>
    </div>
  )
}

export default index
