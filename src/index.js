'use client'
import React from "react";
import ReactDOM from "react-dom/client";  // Use the 'client' import for React 18
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Get the root element where your React app will be rendered
const root = ReactDOM.createRoot(document.getElementById("root"));

// Use createRoot() to render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: This can be left as is, used for performance tracking
reportWebVitals();
