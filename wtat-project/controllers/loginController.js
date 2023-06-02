const User = require("../models/User");

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

module.exports = {
    getLoginPage,
    postLoginPage
}