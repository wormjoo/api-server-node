module.exports = function (app) {
    const passport = require('passport');

    app.get('/kakao', passport.authenticate('kakao'));
    app.get('/oauth/kakao/callback', passport.authenticate('kakao', {
        failureRedirect: '/',
    }), (req, res) => {
        res.redirect('/');
    });
};