const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// 設定 todos/new 路由頁面，顯示 new.hbs 頁面
router.get('/new', (req, res) => {
  return res.render('new')  
})

router.post('/', (req, res) => {
  const name = req.body.name
  // console.log(name)
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  // console.log(id)
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', {todo}))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', {todo}))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  console.log(req.body)
  const {name, isDone} = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      // if (isDone === 'on') {
      //   todo.isDone = true;
      // } else {
      //   todo.isDone = false
      // }
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router