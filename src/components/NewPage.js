import React from 'react';
import { FaHome, FaChartLine, FaUser, FaCog } from 'react-icons/fa';
import '../styles/styles.css';

function NewPage() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>Expense Tracker</h2>
        </div>
        <div className="navbar-links">
          <a href="#" className="nav-link active"><FaHome /> Home</a>
          <a href="#" className="nav-link"><FaChartLine /> Dashboard</a>
          <a href="#" className="nav-link"><FaUser /> Profile</a>
          <a href="#" className="nav-link"><FaCog /> Settings</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Expense Tracker</h1>
            <p>Track your expenses, manage your budget, and achieve your financial goals with our intuitive platform.</p>
            <button className="cta-button">Get Started</button>
          </div>
          <div className="hero-image">
            <img src="/images/expense.jpg" alt="Expense Tracker" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPage; 