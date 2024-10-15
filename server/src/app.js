const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ORIGIN = process.env.ORIGIN || "*";
const api = require("./versions/v1/api");
const path = require("path");
const multer  = require('multer')
// Multer storage configuration
const storage = multer.diskStorage({
  // Set the destination folder where files should be saved
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // Adjust this path as needed
  },
  // Use the file's original name, including its extension
  filename: (req, file, cb) => {
    // Extract the original file extension
    const ext = path.extname(file.originalname);
    // Use a unique name (e.g., user ID or timestamp) along with the original extension
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });
const cspOptions = {
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: [
      "'self'",
      "data:",
      "https://i.ibb.co",
      "https://www.ashrafatef.tech",
      "https://ashrafatef.tech",
    ],
    scriptSrc: [
      "'self'",
      "https://www.ashrafatef.tech",
      "https://ashrafatef.tech",
    ],
    frameSrc: ["'self'", "https://www.youtube.com"],
    connectSrc: ["'self'", "https://i.ibb.co/9sz6Q1T/932.jpg"],
    workerSrc: ["'self'", "blob:"],
  },
};

// app.use(helmet());
app.use(helmet.contentSecurityPolicy(cspOptions));
app.use(morgan("combined"));
app.use(
  cors({
    // origin: ORIGIN,
    // origin: "*",
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  return next();
}
);
app.use((err, req, res, next) => {
  res.status(400).send(err);
});

app.use("/api/v1", api);
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
