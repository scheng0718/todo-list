// Load express module and use express
const express = require('express')
const app = express()
// Load mongoose
const mongoose = require('mongoose')
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true})
// 取得連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('This is application of todo-list')
})

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`)
})
