// Load express module and use express
const express = require('express')
// Load mongoose
const mongoose = require('mongoose')
// Load express handlebars
const exphbs = require('express-handlebars')
// Load body-parser
const bodyParser = require('body-parser')
// load method-override
const methodOverride = require('method-override')

const routes = require('./routes')
const app = express()
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
app.use(methodOverride('_method'))
app.use(routes)
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`)
})
