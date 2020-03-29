var router = require('express').Router()
var path = require('path');

router.use('/api/v1', require('./api'))

router.get('/is_running', (req, res, next) => {
  res.send({ response: 'ok' })
})

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
  } else {
    res.sendFile(path.join(__dirname, '../../public/login.html'))
  }
})

module.exports = router
