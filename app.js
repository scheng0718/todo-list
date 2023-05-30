// Load express module and use express
const express = require('express')
const app = express()
// Load mongoose
const mongoose = require('mongoose')
// Load express handlebars
const exphbs = require('express-handlebars')
// Load Todo
const Todo = require('./models/todo')
// Load body-parser
const bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', {todos}))
    .catch(error => console.error(error))
})
// 設定 todos/new 路由頁面，顯示 new.hbs 頁面
app.get('/todos/new', (req, res) => {
  return res.render('new')  
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  console.log(name)
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', {todo}))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', {todo}))
    .catch(error => console.log(error))
})


app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`)
})
