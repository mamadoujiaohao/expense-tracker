const mongoose = require('mongoose')
const Expense = require('../expense')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,}) 

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
  
db.once('open', async() => {
    console.log('mongodb connected!')
    await Expense.create({name:'test'})
    console.log('done')
})

module.exports = db