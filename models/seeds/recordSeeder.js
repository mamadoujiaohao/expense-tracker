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
    try{
    console.log('mongodb connected!')
    await Expense.create({name:'test', date: Date.now(), amount:'60', categoryId:'1'})
    console.log('done')
    process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
})
