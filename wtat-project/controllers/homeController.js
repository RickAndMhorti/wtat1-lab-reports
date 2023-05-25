const getHomepage = (req, res) => {
    res.render('homepage', { user: req.session.user });
};

module.exports =
    {
        getHomepage
    }
