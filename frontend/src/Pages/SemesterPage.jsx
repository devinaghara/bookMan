// SemesterPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function SemesterPage() {
  const { semester } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate();

  const getPdfsForSemester = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-files/${semester}`);
      setPdfs(response.data.data);
    } catch (error) {
      console.error("Error fetching PDFs for semester:", error);
    }
  };

  useEffect(() => {
    getPdfsForSemester();
  }, [semester]);

  // Group PDFs by subject
  const groupedBySubject = pdfs.reduce((acc, pdf) => {
    acc[pdf.subject] = acc[pdf.subject] || [];
    acc[pdf.subject].push(pdf);
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h2>PDFs for Semester {semester}</h2>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Back
      </button>
      <div className="pdf-list mt-5">
        {Object.keys(groupedBySubject).map((subject) => (
          <div key={subject}>
            <h3>{subject}</h3>
            {groupedBySubject[subject].map((pdf) => (
              <div key={pdf._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Title: {pdf.title}</h5>
                  <button className="btn btn-primary" onClick={() => window.open(`http://localhost:5000/files/${pdf.pdf}`, "_blank")}>
                    View PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SemesterPage;
