require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const statesRoutes = require('./routes/states');
const path = require('path');

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/states', statesRoutes);

// Serve HTML at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 Catch-All Route
app.use((req, res) => {
  const accept = req.headers.accept || '';

  if (accept.includes('html')) {
    res.status(404).send(`
      <html>
        <head><title>404 Not Found</title></head>
        <body>
          <h1>404 Not Found</h1>
          <p>The requested resource could not be found.</p>
        </body>
      </html>
    `);
  } else if (accept.includes('json')) {
    res.status(404).json({ error: "404 Not Found" });
  } else {
    res.status(404).type('txt').send("404 Not Found");
  }
});

// Start server after DB connects
mongoose.connection.once('open', () => {
  const PORT = process.env.PORT || 3500;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
