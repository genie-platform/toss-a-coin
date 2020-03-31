const router = require('express').Router()
const mongoose = require('mongoose')
const Round = mongoose.model('Round')
const UserState = mongoose.model('UserState')

const auth = require('../auth')

router.post('/act', auth, async (req, res, next) => {
  const { guess } = req.body
  const { user } = req
  let currentRound = await Round.findOne().current()
  if (!currentRound) {
    currentRound = await Round.startRound()
  }
  // let userState = await UserState.findOne({ roundId: currentRound._id, user })
  // if (userState) {
  //   return res.send({ error: 'User already played in that round' }).status(400)
  // }
  // userState = await new UserState({ guess, roundId: currentRound._id, user }).save()

  const userState = await UserState.findOneAndUpdate({ roundId: currentRound._id, user }, { guess }, { upsert: true, new: true})
  res.send({ data: userState })
})

router.get('/', auth, async (req, res, next) => {
  const currentRound = await Round.findOne().current()
  res.send({ data: currentRound })
})

module.exports = router
