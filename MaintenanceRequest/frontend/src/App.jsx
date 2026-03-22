import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import MaintenanceRequest from './pages/MaintenanceRequest.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/maintenance" />} />
            <Route path="/maintenance" element={<MaintenanceRequest />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App