import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Second Home 🏡</h1>
        <p>Your comfort, our priority. Find the perfect hostel room easily.</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>Affordable Rooms</h3>
          <p>Choose from single, double, or shared rooms at great prices.</p>
        </div>

        <div className="feature-card">
          <h3>Apply Now</h3>
          <p>Click below to book your room quickly and easily.</p>

          {/* ✅ WORKING BUTTON */}
          <button 
            className="cta-btn"
            onClick={() => navigate("/apply")}
          >
            Apply for a Room
          </button>
        </div>

        <div className="feature-card">
          <h3>Safe Environment</h3>
          <p>24/7 security and a friendly community for a peaceful stay.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Second Home Hostel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;