const User = require('../models/User');

const getUserPage = (req, res) => {
   if (req.session.user) {
     if (req.query.edit === 'true') {
       res.render('editUser', { user: req.session.user });
     } else {
       res.render('profile', { user: req.session.user });
     }
   } else {
     res.redirect('/login');
   }
 };
 const displayAllUsers = async (req, res) => {
     try {
       const users = await User.find({}).exec();
       res.render('users', { users });
     } catch (err) {
       console.log(err);
       res.status(500).send('An error occurred while retrieving users.');
     }
   };

//  const updateUser = async (req, res) => {
//      const { id } = req.params;
//      const { username, email, password, region, eloRating } = req.body;
  
//      try {
        
//          const user = await User.findById(id).populate('region');

//          if (!user) {
//              return res.status(404).send('User not found.');
//          }

//          user.username = username;
//          user.email = email;
//          const hash = bcrypt.hashSync(password, 10);
//          user.password = hash;
//          user.region.name = region;
//          user.eloRating = eloRating;

//          await user.save();
//          res.redirect('/users');

//      } catch (err) {
//          console.log(err);
//          res.status(500).send('An error occurred while updating the user.');
//      }
//    };

//    const deleteUser = async (req, res) => {
//      const { id } = req.params;
  
//      try {
//          const deletedUser = await User.findByIdAndRemove(id);
        
//          if (!deletedUser) {
//            return res.status(404).send('User not found.');
//          }
        
//          res.redirect('/users');
//      } catch (err) {
//          console.log(err);
//          res.status(500).send('An error occurred while deleting the user.');
//      }
//    };



// Get all users
const getAllUsers = (req, res) => {
  // Retrieve users from the database
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(users);
  });
};

// Get a specific user
const getUser = (req, res) => {
  const userId = req.params.id;
  // Retrieve the user from the database
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
};

// Update a specific user
const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  // Update the user in the database
  User.findByIdAndUpdate(userId, updatedData, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {

      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
};

// Delete a specific user
const deleteUser = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
};

// Update match
const updateMatch = (req, res) => {
  const matchId = req.params.id;
  const updatedData = req.body;
  Match.findByIdAndUpdate(matchId, updatedData, { new: true }, (err, match) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
  });
};

// Delete match
const deleteMatch = (req, res) => {
  const matchId = req.params.id;
  Match.findByIdAndDelete(matchId, (err, match) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json({ message: 'Match deleted successfully' });
  });
};

// Get all matches
const getAllMatches = (req, res) => {
  Match.find({}, (err, matches) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(matches);
  });
};

// Get a specific match
const getMatch = (req, res) => {
  const matchId = req.params.id;
  Match.findById(matchId, (err, match) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
  });
};

// Create a new match
const createMatch = (req, res) => {
  const matchData = req.body;
  Match.create(matchData, (err, match) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(match);
  });
};

// Fetch modal content
exports.fetchModalContent = (req, res) => {
  // Fetch the content for the modal (can be retrieved from the database, an API, or any other source)
  const modalContent = '<p>This is the content for the modal.</p>';

  // Send the modal content as a response
  res.send(modalContent);
};

module.exports = {
    getUserPage,
    displayAllUsers,
    updateUser,
    deleteUser,
};