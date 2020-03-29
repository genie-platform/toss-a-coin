const passport = require('passport')
const config = require('config')
const mongoose = require('mongoose')
const lodash = require('lodash')
const User = mongoose.model('User')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  ...config.get('api.auth.google'),
  callbackURL: '/api/v1/login/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOneAndUpdate({ id: profile.id }, { ...profile, profile: lodash.omit(profile, '_raw', '_json') }, { new: true, upsert: true })
  return done(null, user)
})
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  const user = await User.findOne({ id: id })
  done(null, user)
})

module.exports = passport
