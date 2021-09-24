const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    console.log("running2");
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/images", express.static(path.join(__dirname, "upload")));

app.get("/", (req, res) => {
  res.end("Welcome to upload server");
});

app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log("running3");
  res.send("saved ...");
});

app.get("/download", (req,res) => {
  const file = req.body;
  if(!file){
    res.status(400).send("Bad request");
  }
  const filePath = path.join(__dirname, "/upload", `/${file}`);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    res.status(404).send("file not exists");
  });
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

app.listen(PORT, () => {
  console.log("Server is running ... ");
});
