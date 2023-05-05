const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')
const Categories = require('../../models/category')

router.get('/sort', (req, res) => {
  const userId = req.user._id
  const selectedCategoryId = Number(req.query.sort)
  if (selectedCategoryId === 6) {
    return res.redirect('/')
  }
  Expenses.find({ userId, categoryId: selectedCategoryId })
    .lean()
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = expense.date.toISOString().split('T')[0].replace(/-/g, '/')
      })
      console.log(selectedCategoryId)
      res.render('index',{ expenses, totalAmount, selectedCategoryId })
    })
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  const userId = req.user._id
  Expenses.find({ userId })
    .lean()
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = expense.date.toISOString().split('T')[0].replace(/-/g, '/')
        Categories.find({})
      })
      res.render('home',{ expenses, totalAmount })
      console.log(expenses, totalAmount)
    })
    .catch(err => console.log(err))
})

module.exports = router