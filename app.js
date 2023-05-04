const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const db = require('./config/mongoose')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') { require('dotenv').config()} 
const port = process.env.PORT

const routes = require('./routes')//express自動找index.js
require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })) //版本7.0.7需要用exphbs.engine(),否則會報錯
app.set('view engine', 'hbs')

app.use(routes)

app.listen(port, ()=>{
    console.log('Server is listening on port', port)
})

