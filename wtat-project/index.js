// Load required modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose').default;
const passport = require('passport');
const bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local');

// Route to controllers
const homeController = require('./controllers/homeController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const userController = require('./controllers/userController');
//const authController = require('./controllers/authController');
const matchController = require('./controllers/matchController');

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

// Set up Passport.js
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  req.session.user = user;
  done(null, user);
});
passport.use(new LocalStrategy(loginController.verifyUser));

// Define the routes
app.get('/', homeController.getHomepage);

//Register page
app.get('/register', registerController.getRegisterPage);
app.post('/register', registerController.postRegisterPage);

//Login page
app.get('/login', loginController.getLoginPage);
app.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login'
}));

//Logout page
app.get('/logout', logoutController.getLogoutPage);

//Profile page
app.get('/profile', userController.getUserPage);

//Match page
app.get('/matchmaking', matchController.getMatchPage);

app.get('/users', userController.displayAllUsers); 
app.post('/users/update/:id', userController.updateUser); 
app.post('/users/delete/:id', userController.deleteUser); 

//Init server
const port = 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

// Define API routes
const apiRouter = express.Router();

// Users API
apiRouter.get('/users', userController.getAllUsers);
apiRouter.get('/users/:id', userController.getUser);
apiRouter.put('/users/:id', userController.updateUser);
apiRouter.delete('/users/:id', userController.deleteUser);

// Matches API
apiRouter.get('/matches', matchController.getAllMatches);
apiRouter.get('/matches/:id', matchController.getMatch);
apiRouter.post('/matches', matchController.createMatch);
apiRouter.put('/matches/:id', matchController.updateMatch);
apiRouter.delete('/matches/:id', matchController.deleteMatch);

// Mount the API router
app.use('/api', apiRouter);
