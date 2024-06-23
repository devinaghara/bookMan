// HomePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [semester, setSemester] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const viewSemesterPdfs = () => {
    if (semester) {
      navigate(`/semester/${semester}`);
    } else {
      alert("Please enter a semester");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminId === "admin" && password === "password") {
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h4>Student User</h4>
          <label>Select Semester</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
          <button className="btn btn-primary mt-3" onClick={viewSemesterPdfs}>
            View PDFs
          </button>
        </div>
        <div className="col-md-6">
          <h4>Admin Login</h4>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="form-control"
              placeholder="Admin ID"
              required
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-3"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
