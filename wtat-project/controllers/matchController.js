const User = require("../models/User");

const getMatchPage = (async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const currentUser = await User.findById(req.session.user._id);
    const otherUsers = await User.find({ _id: { $ne: currentUser._id } }).sort({ eloRating: 1 }).limit(1);

    res.render('matchmaking', { user: currentUser, otherUsers });
})

module.exports = {
    getMatchPage
}