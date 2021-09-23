const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v4 } = require("uuid");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    console.log("running2");
    cb(null, `${v4() + path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.end("Welcome to upload server");
})

app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log("running3");
  res.send("saved ...");
});

app.listen(PORT, () => {
  console.log("Server is running ... ");
});
