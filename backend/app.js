const express = require("express");
const app = express();
const user = require("./controller/user");
const product = require("./controller/product");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const path = require('path');

app.use(errorHandler);

// Built-in middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

app.use("/api/v2/user", user);
app.use("/api/v2/product", product);
 
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

app.use('/uploads', express.static(path.join(___dirname, 'uploads')));
app.use('/products', express.static(path.join(___dirname, 'uploads')));

app.get("/", (_req, res) => {
  return res.send("Welcome to backend");
});

module.exports=app;
