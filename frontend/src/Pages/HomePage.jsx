// HomePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();

  const viewSemesterPdfs = () => {
    if (semester) {
      navigate(`/semester/${semester}`);
    } else {
      alert("Please enter a semester");
    }
  };

  return (
    <div className="home-page">
      <h4>Select Semester</h4>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      />
      <button className="btn btn-primary" onClick={viewSemesterPdfs}>
        View PDFs
      </button>
    </div>
  );
}

export default HomePage;
