// SemesterPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function SemesterPage() {
  const { semester } = useParams();
  const [pdfs, setPdfs] = useState([]);

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
    <div>
      <h2>PDFs for Semester {semester}</h2>
      <Link to="/admin"><button>Upload</button></Link>
      <div className="pdf-list">
        {Object.keys(groupedBySubject).map((subject) => (
          <div key={subject}>
            <h3>{subject}</h3>
            {groupedBySubject[subject].map((pdf) => (
              <div key={pdf._id}>
                <h4>Title: {pdf.title}</h4>
                <button onClick={() => window.open(`http://localhost:5000/files/${pdf.pdf}`, "_blank")}>
                  View PDF
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SemesterPage;
