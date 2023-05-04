const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')

router.get('/', async (req, res) => {
    try{
        const userId = req.user._id
        await Expenses.find({ userId })
        await Expenses.lean()
        await Expenses.sort({date: 'asc'}) 
        await res.render('home',{expense})
        res.render('home')
    } catch (error) {
        console.error(error)
    }
    })
  
  module.exports = router