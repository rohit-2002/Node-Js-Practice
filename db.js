const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL_LOCAL;

if (!mongoURL) {
  console.error(
    "MongoDB connection string is undefined. Please check your .env file."
  );
  process.exit(1); // Exit the application if the URL is not defined
}

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
