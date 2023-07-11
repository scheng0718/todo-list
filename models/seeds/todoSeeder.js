const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// ../ 是引用父目錄
const Todo = require('../todo')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
// 設定 open 事件監聽器
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (let i = 0; i < 10; i++) {
        return Promise.all(Array.from(
          { length: 10 },
          (_, i) => Todo.create({ 
            name: `name-${i}`,userId
          })
        ))
      }
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})