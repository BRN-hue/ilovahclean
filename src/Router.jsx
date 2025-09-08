import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Careers from './Careers'
import AdminLogin from './AdminLogin'
import Admin from './Admin'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default AppRouter