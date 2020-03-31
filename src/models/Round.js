const mongoose = require('mongoose')
const { Schema } = mongoose

const ROUND_INTERVAL = 2 * 60 * 60 * 1000 // two hours

const RoundSchema = new Schema({
  startingAt: { type: Date, required: [true, "can't be blank"] },
  endingAt: { type: Date, required: [true, "can't be blank"] },
  winnerId: { type: String }
}, { timestamps: true })

RoundSchema.statics.startRound = function (cb) {
  const now = new Date()
  return new Round({
    startingAt: now,
    endingAt: new Date(now.getTime() + ROUND_INTERVAL)
  }).save(cb)
}

RoundSchema.query.current = function () {
  return this.where({ })
}

const Round = mongoose.model('Round', RoundSchema)

module.exports = Round
