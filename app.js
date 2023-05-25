// Load express module and use express
const express = require('express')
const app = express()
// Load mongoose
const mongoose = require('mongoose')
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
app.get('/', (req, res) => {
  res.send('This is application of todo-list')
})

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`)
})
