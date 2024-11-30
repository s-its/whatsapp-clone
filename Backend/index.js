const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
// const connectDB = require("../config/connection");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTED_URL,
    Credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.Port || 5000;
app.listen(PORT);
// connectDB().then(() => {
//   app.listen(PORT, () => {
//   app.listen(PORT, () => {
//     console.log("Server is running: " + PORT);
//   });
// });
