const auth = (req, res, next) => {
  console.log(req.cookies)
  if (req.isAuthenticated()) {
    next()
  } else {
    throw new Error('User is not Authenticated')
  }
}
module.exports = auth
