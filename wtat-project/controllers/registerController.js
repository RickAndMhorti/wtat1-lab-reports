const bcrypt = require("bcrypt");
const Region = require("../models/Region");
const User = require("../models/User");

const getRegisterPage = ((req, res) => {
    res.render('register');
})

const postRegisterPage = (async (req, res) => {
    // Validate email address
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(req.body.email)) {
        return res.render('register', { error: 'Invalid email address' });
    }

    // Validate user name
    if (!req.body.username || req.body.username.trim().length === 0) {
        return res.render('register', { error: 'Username is required' });
    }
    
    try {
        // Check if username is already taken
       const existingUser = await User.findOne({ username: req.body.username });
       if (existingUser) {
           return res.render('register', { error: 'Username already taken' });
       }
   } catch (err) {
       console.error(err);
       res.render('register', { error: 'Error reading user data' });
   }

    // Validate region
    const regionRegex = /^[\w\s]+$/; // Multiple words
    if (!regionRegex.test(req.body.region)) {
        return res.render('register', { error: 'Invalid region' });
    }
    const regionName = req.body.region;

    var region = await Region.findOne({ name: regionName });
    if (!region) {
      // Create a new region since it doesn't exist
      const newRegion = new Region({ name: regionName });
      region = await newRegion.save();
    }

    // Hash password
    const hash = bcrypt.hashSync(req.body.password, 10);

    // Create new user
    const user = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        region: region, 
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
    
})

module.exports =
{
    getRegisterPage,
    postRegisterPage
}