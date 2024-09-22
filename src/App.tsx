// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/core/Naigation";
import AppRoutes from "./routes/Routes"; // Decoupled Routes
import './App.css';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-4">
        <Navigation />
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
