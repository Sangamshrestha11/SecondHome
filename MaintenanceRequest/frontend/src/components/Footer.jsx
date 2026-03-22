import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">© 2026 Second Home Facilities Management System</span>
        <div className="footer-links">
          <a href="#">Support Center</a>
          <a href="#">Facility Rules</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
