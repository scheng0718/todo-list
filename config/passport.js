const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
module.exports = (app) => {
  // initialize passport module 
  app.use(passport.initialize());
  app.use(passport.session());
  // passport local strategy
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({email})
      .then(user => {
        if (!user) {
          return done(null, false, {message: 'This email is not registered!'})
        }
        if (user.password !== password) {
          return done(null, false, {message: 'Email or password is incorrect!'})
        }
        return done(null, user)
      })
      .catch(error => done(error, false))
  }))
  // Set up serialization and deserialization 
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => {
        console.log(user)
        done(null, user)
      })
      .catch(error => done(error, null))
  })
}