import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import AddExpense from "./components/AddExpense";
import Sidebar from "./components/Sidebar";
import './styles/styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-expense" element={<AddExpense />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
