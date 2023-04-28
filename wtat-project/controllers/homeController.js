exports.showHomePage = (req, res) => {
    res.render("homepage");
};

exports.savedSubmission = (req, res) => {

    console.log(req.body);
    console.log(req.query);

    res.render("thanks");

};