const getUserPage = ((req, res) => {
    if (req.session.user) {
        res.render('profile', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
})

const displayAllUsers = ((req, res) => {


})

module.exports = {
    getUserPage
}