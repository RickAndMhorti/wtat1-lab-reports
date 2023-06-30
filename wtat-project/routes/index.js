const express = require('express');
const app = express();

// Import the route modules
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const homeRoutes = require('./routes/homeRoutes');
const registerRoutes = require('./routes/registerRoutes');
const logoutRoutes = require('./routes/logoutRoutes');

// Set up the routes
app.use('/', userRoutes);
app.use('/', matchRoutes);
app.use('/', homeRoutes);
app.use('/', registerRoutes);
app.use('/', logoutRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});