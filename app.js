const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') { require('dotenv').config()} 
const port = process.env.PORT

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })) //版本7.0.7需要用exphbs.engine(),否則會報錯
app.set('view engine', 'hbs')

app.get('/', async (req, res)=>{
    await res.render('home')
    console.log('home rendered')
})

app.listen(port, ()=>{
    console.log('Server is listening on port', port)
})

