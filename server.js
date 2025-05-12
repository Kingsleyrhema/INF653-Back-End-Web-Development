<<<<<<< HEAD
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
=======
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
>>>>>>> 4be19f1b3fbc4f210b4fc9ae9156b7ff41439025
app.use('/states', statesRoutes);

// Serve HTML at root
app.get('/', (req, res) => {
<<<<<<< HEAD
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 Catch-All Route
=======
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

// 404 route
>>>>>>> 4be19f1b3fbc4f210b4fc9ae9156b7ff41439025
app.use((req, res) => {
  const accept = req.headers.accept || '';

  if (accept.includes('html')) {
<<<<<<< HEAD
    res.status(404).send(`
      <html>
        <head><title>404 Not Found</title></head>
        <body>
          <h1>404 Not Found</h1>
          <p>The requested resource could not be found.</p>
        </body>
      </html>
    `);
=======
    res.status(404).sendFile(path.join(__dirname, 'app/404.html'));
>>>>>>> 4be19f1b3fbc4f210b4fc9ae9156b7ff41439025
  } else if (accept.includes('json')) {
    res.status(404).json({ error: "404 Not Found" });
  } else {
    res.status(404).type('txt').send("404 Not Found");
  }
});

<<<<<<< HEAD
// Start server after DB connects
=======

>>>>>>> 4be19f1b3fbc4f210b4fc9ae9156b7ff41439025
mongoose.connection.once('open', () => {
  const PORT = process.env.PORT || 3500;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
