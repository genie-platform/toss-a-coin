const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  id: { type: String, required: [true, "can't be blank"] },
  displayName: { type: String, required: [true, "can't be blank"] },
  provider: { type: String, required: [true, "can't be blank"] },
  profile: { type: Object }
}, { timestamps: true })

UserSchema.index({ id: 1 }, { unique: true })

const User = mongoose.model('User', UserSchema)

module.exports = User
