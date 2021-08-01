const withAuth = (req, res, next) => {
    // The issue with the function was !req.session.userID (I was using logged_in)
    if (!req.session.userId) {
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = withAuth;