// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SemesterPage from "./Pages/SemesterPage";
import AdminPage from "./Pages/AdminPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/semester/:semester" element={<SemesterPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
