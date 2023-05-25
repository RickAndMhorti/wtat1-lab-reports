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
})

module.exports =
{
    getRegisterPage,
    postRegisterPage
}