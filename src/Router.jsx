import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Careers from './Careers'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  )
}

export default AppRouter