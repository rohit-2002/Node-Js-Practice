const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
// Use bodyParser middleware
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello, Welcome to my hotels how can i help you ?");
});

const personRouters = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
app.use("/person", personRouters);
app.use("/MenuItem", menuRoutes);


app.listen(3000, () => {
  console.log("Listening on port number: 3000");
});
