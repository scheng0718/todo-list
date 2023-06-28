// Load mongoose
const mongoose = require('mongoose')
// Use Schema module
const Schema = mongoose.Schema
// Construct a new object
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: true
  },
  password: {
    type: String,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)