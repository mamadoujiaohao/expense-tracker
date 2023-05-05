const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')


router.get('/', (req, res) => {
    const userId = req.user._id   // 變數設定
    Expenses.find({ userId })         // 加入查詢條件
      .lean()
      .sort({date: 'asc'}) 
      .then((expense) => {res.render('home',{expense})})
      .catch(error => console.error(error))
    })

module.exports = router
