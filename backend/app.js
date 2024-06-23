const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch(e => console.log(e));

// Define the PDF schema
const pdfSchema = new mongoose.Schema({
  title: String,
  pdf: String,
  sem: String,
  subject: String
});
const PdfDetails = mongoose.model("PdfDetails", pdfSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./files"),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const upload = multer({ storage: storage });

// Route for uploading files
app.post("/upload-files", upload.single("file"), async (req, res) => {
  const { title, sem, subject } = req.body;
  const fileName = req.file.filename;
  try {
    await PdfDetails.create({ title, pdf: fileName, sem, subject });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

// Route for fetching files by semester
app.get("/get-files/:semester", async (req, res) => {
  const { semester } = req.params;
  try {
    const data = await PdfDetails.find({ sem: semester });
    res.send({ status: "ok", data });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
