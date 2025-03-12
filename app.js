const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const schoolRoutes = require("./routes/schoolRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", schoolRoutes);

module.exports = app;
