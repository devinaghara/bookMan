// app.js (Backend)
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

// MongoDB connection
const mongoUrl = "mongodb://localhost:27017";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(e));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// PDF Schema
const pdfSchema = new mongoose.Schema({
  title: String,
  pdf: String,
  sem: String,
  subject: String,
});

const Pdf = mongoose.model("Pdf", pdfSchema);

// Upload PDF
app.post("/upload-files", upload.single("file"), async (req, res) => {
  const { title, sem, subject } = req.body;
  const pdf = req.file.filename;
  try {
    const newPdf = new Pdf({ title, pdf, sem, subject });
    await newPdf.save();
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: error });
  }
});

// Get PDFs for a specific semester
app.get("/get-files/:semester", async (req, res) => {
  const { semester } = req.params;
  try {
    const data = await Pdf.find({ sem: semester });
    res.send({ status: "ok", data });
  } catch (error) {
    res.send({ status: error });
  }
});

// Basic route
app.get("/", (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(5000, () => {
  console.log("Server Started");
});
