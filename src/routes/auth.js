const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    next(new Error('User is not Authenticated'))
  }
}
module.exports = auth
