import React from 'react';
import { FaUsers, FaChartPie, FaEnvelope } from 'react-icons/fa';

function About() {
  return (
    <div className="about-section">
      <h2>About Us</h2>
      <div className="about-content">
        <div className="about-text">
          <p>Welcome to Expense Tracker, your comprehensive solution for managing personal finances. Our platform helps you track expenses, analyze spending patterns, and achieve your financial goals.</p>
          <p>With intuitive features and powerful analytics, we make financial management simple and effective for everyone.</p>
        </div>
        <div className="about-stats">
          <div className="stat-item">
            <FaUsers className="stat-icon" />
            <h3>1000+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <FaChartPie className="stat-icon" />
            <h3>7</h3>
            <p>Categories</p>
          </div>
          <div className="stat-item">
            <FaEnvelope className="stat-icon" />
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 