
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const add = require('./modules/add')
const users = require('./modules/users')
const auth = require('./modules/auth') 
const { authenticator } = require('../middleware/auth')

router.use('/expense', authenticator, expense)
//router.use('/add', add)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
