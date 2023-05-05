const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./routes')//express自動找index.js
require('./config/mongoose')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') { require('dotenv').config()} 
const port = process.env.PORT



app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })) //版本7.0.7需要用exphbs.engine(),否則會報錯
app.set('view engine', 'hbs')

app.use(flash())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
  }))
usePassport(app)
app.use(routes) //router放最後


app.listen(port, ()=>{
    console.log('Server is listening on port', port)
})

