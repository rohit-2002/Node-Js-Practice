const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGODB_URL_LOCAL
// const mongoURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
