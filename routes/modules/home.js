const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')
const Categories = require('../../models/category')


router.get('/', (req, res) => {
  const userId = req.user._id
  const findExpense =   Expenses.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(expenses => {
      let totalAmount = 0
      const homeData = 
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = new Date(expense.date).toISOString().split('T')[0].replace(/-/g, '/')
        return expenses
      })
      return [expenses, totalAmount]
    })
    const findCategories = Categories.find({})
    .lean()
    .then(categories => {return categories })
  
    Promise.all([findExpense, findCategories])
    .then(([[expenses, totalAmount], categories])=>{res.render('home',{ expenses, totalAmount, categories })})
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const categoryId = req.body.filter
  if(categoryId === '全部'){
    const findExpense =   Expenses.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(expenses => {
      let totalAmount = 0
      const homeData = 
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = new Date(expense.date).toISOString().split('T')[0].replace(/-/g, '/')
        return expenses
      })
      return [expenses, totalAmount]
    })
    const findCategories = Categories.find({})
    .lean()
    .then(categories => {return categories })
  
    Promise.all([findExpense, findCategories])
    .then(([[expenses, totalAmount], categories])=>{res.render('home',{ expenses, totalAmount, categories })})
    .catch(err => console.log(err))
  } else {
    const findExpense =   Expenses.find({ userId, categoryId })
    .lean()
    .sort({ date: 'desc' })
    .then(expenses => {
      let totalAmount = 0
      const homeData = 
      expenses.forEach(expense => {
        totalAmount += expense.amount
        expense.date = new Date(expense.date).toISOString().split('T')[0].replace(/-/g, '/')
        return expenses
      })
      return [expenses, totalAmount]
    })
    const findCategories = Categories.find({})
    .lean()
    .then(categories => {return categories })
  
    Promise.all([findExpense, findCategories])
    .then(([[expenses, totalAmount], categories])=>{
      res.render('home',{ expenses, totalAmount, categories})})
    .catch(err => console.log(err))
  }
 
})




module.exports = router