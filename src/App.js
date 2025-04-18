import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import AddExpense from "./components/AddExpense";
import './styles/styles.css';
import Navigation from "./components/Navigation";
import Contact from "./components/Contact";
import About from "./components/About";
import NewPage from './components/NewPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/new-page" element={<NewPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
