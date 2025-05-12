const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const statesRoutes = require('./routes/states');

const app = express();
connectDB();

app.use(express.json());

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/states', statesRoutes);

// Serve HTML at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

// 404 route
app.use((req, res) => {
  const accept = req.headers.accept || '';

  if (accept.includes('html')) {
    res.status(404).sendFile(path.join(__dirname, 'app/404.html'));
  } else if (accept.includes('json')) {
    res.status(404).json({ error: "404 Not Found" });
  } else {
    res.status(404).type('txt').send("404 Not Found");
  }
});

mongoose.connection.once('open', () => {
  const PORT = process.env.PORT || 3500;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
