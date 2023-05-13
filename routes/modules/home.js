const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')
const Categories = require('../../models/category')


router.get('/', (req, res) => {
  const userId = req.user._id
  Expenses.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(expenses => {
      let totalAmount = 0
      const homeData = 
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = new Date(expense.date).toISOString().split('T')[0].replace(/-/g, '/')
      })
      res.render('home',{ expenses, totalAmount, categories })
    })
    .catch(err => console.log(err))
})




module.exports = router