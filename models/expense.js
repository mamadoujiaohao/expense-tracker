const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    name:{type: String, required: true},
    date:{type: Date, required: true},
    amount:{type: Number, required: true},
    userId:{type: String, required: true},
    categoryId:{type: Number, required: true}
})

module.exports = mongoose.model('Expense', expenseSchema)