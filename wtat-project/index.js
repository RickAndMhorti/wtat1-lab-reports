// Load required modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/User');
const homeController = require('./controllers/homeController');
//const authController = require('./controllers/authController');
//const userController = require('./controllers/userController');
//const matchController = require('./controllers/matchController');

// Create an Express app
const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/chessmate', {
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

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  // Validate email address
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.render('register', { error: 'Invalid email address' });
  }

  // Create new user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    region: req.body.region,
    eloRating: req.body.eloRating,
  });

  try {
    await user.save();
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Error registering user' });
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.render('profile', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

app.get('/matchmaking', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const currentUser = await User.findById(req.session.user._id);
  const otherUsers = await User.find({ _id: { $ne: currentUser._id } }).sort({ eloRating: 1 }).limit(1);

  res.render('matchmaking', { user: currentUser, otherUsers });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
