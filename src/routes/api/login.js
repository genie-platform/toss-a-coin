const router = require('express').Router()
const passport = require('@services/passport')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }))

module.exports = router
