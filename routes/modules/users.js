const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 註冊時每個欄位必填
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All field is required!'})
  }
  // 密碼和確認密碼不符合
  if (password !== confirmPassword) {
    errors.push({ message: 'Your password is not matched. Please check it!'})
  }
  // 如果 errors 陣列中有東西，傳回樣版引擎顯示 error message 
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .lean()
    .then( user => {
      if (user) {
        errors.push('User already exists.')
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } 
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
              name,
              email,
              password: hash
            })
          )
          .then(() => res.redirect('/'))
          .catch(error => console.log(error)) 
    })
    .catch(error => console.log(error))
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have logged out successfully.')
  res.redirect('/users/login')
})

module.exports = router