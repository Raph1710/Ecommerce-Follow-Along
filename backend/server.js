
const userrouter = require('./controller/user');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose'); // Add Mongoose for MongoDB connection
const app = express();
const port = 8000;

// Enable CORS if needed (if frontend and backend are on different ports)
app.use(cors());

// Body parsing middleware for form data
app.use(express.json());  // For JSON data
app.use(express.urlencoded({ extended: true })); 
app.use(userrouter); // For
// File upload setup using multer
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
const mongoURI = 'mongodb+srv://raphdesantos:raph13600@cluster0.hj8ng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅Database connection successful"))
  .catch((err) => console.error("❌Database connection error:", err));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
