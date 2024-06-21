// server.js

// Require the Express module
const express = require('express');

// Create an Express application
const app = express();

// Middleware example: Logging middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Route: Homepage
app.get('/', (req, res) => {
  res.send('Hello, this is the homepage!');
});

// Route: About page
app.get('/about', (req, res) => {
  res.send('This is the about page');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
