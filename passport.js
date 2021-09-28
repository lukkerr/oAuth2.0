const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const googleConfig = {
  clientID: "CLIENT_ID",
  clientSecret: "CLIENT_SECRET",
  callbackURL: "CALLBACK",
  passReqToCallback: true
}

passport.use(new GoogleStrategy(googleConfig,
  (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));
