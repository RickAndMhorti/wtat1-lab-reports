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

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, region, eloRating } = req.body;
  
    try {
        
        const user = await User.findById(id).populate('region');

        if (!user) {
            return res.status(404).send('User not found.');
        }

        user.username = username;
        user.email = email;
        user.password = password;
        user.region.name = region;
        user.eloRating = eloRating;

        await user.save();
        res.redirect('/users');

    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while updating the user.');
    }
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
        const deletedUser = await User.findByIdAndRemove(id);
        
        if (!deletedUser) {
          return res.status(404).send('User not found.');
        }
        
        res.redirect('/users');
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while deleting the user.');
    }
  };

module.exports = {
    getUserPage,
    displayAllUsers,
    updateUser,
    deleteUser,
};