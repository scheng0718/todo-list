// Load express module and use express
const express = require('express')
const session = require('express-session')
// Load express handlebars
const exphbs = require('express-handlebars')
// Load body-parser
const bodyParser = require('body-parser')
// load method-override
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`)
})
