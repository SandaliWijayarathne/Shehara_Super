const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models/User');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/users/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create the user in the database
    let user = await Users.findOne({ googleId: profile.id });
    if (!user) {
      user = new Users({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        profileImage: profile.photos[0].value,
      });
      await user.save();
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Users.findById(id);
  done(null, user);
});

module.exports = passport;
