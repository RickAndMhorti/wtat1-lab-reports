// Load required modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose').default;

// Route to controllers
const homeController = require('./controllers/homeController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const matchController = require('./controllers/matchController');
const {logout} = require("./controllers/logoutController");

// Create an Express app
const app = express();

// Connect to MongoDB database
mongoose.set("strictQuery", false);
const mongoDB = 'mongodb://127.0.0.1:27017/chessmate';

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files like the stylesheet from the 'public' directory
app.use(express.static('public'));

// Set up sessions
app.use(session({
  secret: '1973108824',
  resave: false,
  saveUninitialized: true,
}));

// Set up a parser for incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Define the routes
app.get('/', homeController.getHomepage);

//Register page
app.get('/register', registerController.getRegisterPage);
app.post('/register', registerController.postRegisterPage);

//Login page
app.get('/login', loginController.getLoginPage);
app.post('/login', loginController.postLoginPage);

//Logout page
app.get('/logout', logoutController.getLogoutPage);

//Profile page
app.get('/profile', userController.getUserPage);

//Match page
app.get('/matchmaking', matchController.getMatchPage);

//Init server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
