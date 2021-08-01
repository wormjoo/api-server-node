const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use('kakao-login', new KakaoStrategy({
    clientID: 'b8c6199cc2f56d64550a3460fa5c1c97',
    callbackURL: 'https://hazel-software.shop/oauth/kakao/callback',
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(profile);
}));