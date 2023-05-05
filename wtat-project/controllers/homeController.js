exports.showHomePage = (req, res) => {
    res.render("homepage");
};

exports.showLogIn = (req, res) => {
    res.render("LogIn");
};

exports.showElo = (req, res) => {
    res.render('elo-rating', { eloRating: req.session.eloRating });
};

exports.savedSubmission = (req, res) => {

    const userElo = parseInt(req.body.userElo);
    if (userElo && userElo > 0) {
        req.session.eloRating = userElo;
    }

    const userRegion = req.body.userRegion;
    if (userRegion) {
        req.session.userRegion = userRegion;
    }
    
    res.redirect('/elo-rating');
};