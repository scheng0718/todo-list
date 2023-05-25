// Load mongoose
const mongoose = require('mongoose')
// Use Schema module
const Schema = mongoose.Schema
// Construct a new object
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  }
})

module.exports = mongoose.model('Todo', todoSchema)