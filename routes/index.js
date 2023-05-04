
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const add = require('./modules/add')
const user = require('/module/user')

router.use('/', home)
router.use('/expense', expense)
router.use('/add', add)
router.use('/user', user)

module.exports = router
