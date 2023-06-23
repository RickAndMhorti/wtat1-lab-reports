const User = require("../models/User");
const bcrypt = require('bcrypt');

const getLoginPage = ((req, res) => {
    res.render('login');
})

const postLoginPage = (async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }).populate('region');
    if (user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
})

const verifyUser = ((username, password, callback) => {

    User.findOne({ username }).then(user => {
        if (!user) {
          return callback(null, false, { message: 'Incorrect username.' });
        }
    
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) {
            return callback(err);
          }
    
          if (!isMatch) {
            return callback(null, false, { message: 'Incorrect password.' });
          }
    
          user.populate('region').then(user => {
            return callback(null, user);
          });
        });
    });

    /*
    User.findOne({ username }, function(err, user) {
        if (err) { 
        return callback(err); 
        }
    
        if (!user) { 
        return callback(null, false, { message: 'Incorrect username.' }); 
        }
    
        if (!bcrypt.compare(password, user.password)) { 
        return callback(null, false, { message: 'Incorrect password.' }); 
        }
    
        user.populate('region');
        return callback(null, user);
    });
    */
    
    /*
    User.findOne({ username }, function(err, user) {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback(null, false, { message: 'Incorrect username.' });
        }

        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) {
                return callback(err);
            }

            if (!isMatch) {
                return callback(null, false, { message: 'Incorrect password.' });
            }

            user.populate('region', function(err) {
                if (err) {
                return callback(err);
                }

                return callback(null, user);
            });
        });
    });
    */
})

module.exports = {
    getLoginPage,
    verifyUser
}