// Load express module and use express
const express = require('express')
const app = express()
// Load mongoose
const mongoose = require('mongoose')
// Load express handlebars
const exphbs = require('express-handlebars')
// Load Todo
const Todo = require('./models/todo')
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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', {todos}))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`)
})
