// AdminPage.js
import React, { useState } from "react";
import axios from "axios";

function AdminPage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [sem, setSem] = useState("");
  const [subject, setSubject] = useState("");

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("sem", sem);
    formData.append("subject", subject);

    try {
      const result = await axios.post(
        "http://localhost:5000/upload-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      alert("File uploaded successfully");
      setTitle("");
      setFile(null);
      setSem("");
      setSubject("");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="admin-page">
      <form className="formStyle w-100 d-flex flex-column gap-3" onSubmit={submitImage}>
        <h4>Upload PDF</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Semester"
          required
          value={sem}
          onChange={(e) => setSem(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
