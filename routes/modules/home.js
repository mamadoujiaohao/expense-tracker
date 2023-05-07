const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')
const Categories = require('../../models/category')

// router.get('/sort', (req, res) => {
//   const userId = req.user._id
//   const selectedCategoryId = Number(req.query.sort)
//   if (selectedCategoryId === 6) {
//     return res.redirect('/')
//   }
//   Expenses.find({ userId, categoryId: selectedCategoryId })
//     .lean()
//     .then(expenses => {
//       let totalAmount = 0
//       expenses.forEach(expense => {
//         totalAmount += expense.amount
//         expense.date = expense.date.toISOString().split('T')[0].replace(/-/g, '/')
//       })
//       console.log(selectedCategoryId)
//       res.render('index',{ expenses, totalAmount, selectedCategoryId })
//     })
//     .catch(err => console.log(err))
// })

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
        return Categories.find({}).sort({ date: 'desc' })
      })
      res.render('home',{ expenses, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router