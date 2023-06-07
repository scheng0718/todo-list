// ../ 是引用父目錄
const Todo = require('../todo')
const db = require('../../config/mongoose')

// 設定 open 事件監聽器
db.once('open', () => {
  console.log('mongodb connected')
  // 迴圈建立十筆種子資料
  for (let i = 0; i < 10; i++) {
    Todo.create({name: `name-${i}`})
  }
  console.log('todo created')
})