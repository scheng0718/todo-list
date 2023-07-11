const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')
module.exports = (app) => {
  // initialize passport module 
  app.use(passport.initialize());
  app.use(passport.session());
  // passport local strategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true}, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', 'This email is not registered!'))
        }
        return bcrypt.compare(password, user.password).then(isMatched => {
          if (!isMatched) {
          return done(null, false, req.flash('warning_msg', 'Email or password is incorrect!'))
        }
        return done(null, user)
        })
      })
      .catch(error => done(error, false))
  }))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    // console.log(profile)
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) {
          return done(null, user)
        }
        // 就算是用 facebook 第三方登入，還是需要為使用者製作密碼
        const randomPassword = Math.random().toString(36).slice(-8)
        // console.log(randomPassword)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(error => console.log(error))
      })
  }))

  // Set up serialization and deserialization 
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // 反序列化會拿到 user 物件的資料
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => {
        done(null, user)
      })
      .catch(error => done(error, null))
  })
}