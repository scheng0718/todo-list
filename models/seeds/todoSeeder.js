// load mongoose
const mongoose = require('mongoose')
// ../ 是引用父目錄
const Todo = require('../todo')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得連線物件
const db = mongoose.connection
// 設定 error 事件監聽器
db.on('error', () => {
  console.log('mongo error')
})
// 設定 open 事件監聽器
db.once('open', () => {
  console.log('mongodb connected')
  // 迴圈建立十筆種子資料
  for (let i = 0; i < 10; i++) {
    Todo.create({name: `name-${i}`})
  }
  console.log('todo created')
})