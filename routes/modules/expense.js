const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')
const Categories = require('../../models/category');

router.get("/new", (req, res) => {
    Categories.find()
      .lean()
      .then((category) => {
        res.render("new", { category });
      });
  });

router.post('/new', (req, res) => {
    const userId = req.user._id
    let {name ,date,amount,categoryId} = req.body 
    Categories.findById(categoryId)
    .lean()
    .then((category)=>{
      const icon = category.icon
      Expenses.create({name,date,amount,userId,categoryId,icon})
        .then(() => {res.redirect('/')})
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  Expenses.findOne({ _id, userId })
    .lean()
    .then(expense => {
      const categoryId = expense.categoryId
      Categories.find()
        .sort({ _id: 'asc' })
        .lean()
        .then(categories => {
          Categories.findById(categoryId)
            .then(category => {
              const categoryName = category.name
              icon = category.icon
              res.render('edit', { expense, categoryId, category: categories, categoryName})
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

router.put('/:_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  const {name,date,amount,categoryId} = req.body

  const CategoryFind = Categories.findById(categoryId)
    .lean()
    .then((category)=>{
      const icon = category.icon
      console.log('return icon')
      return icon
    })

  const ExpenseFind = Expenses.findOneAndUpdate({_id, userId}, {name:name, date:date, amount: amount, categoryId: categoryId, icon:icon}, {new: true})

    const merge = async ()=>{
      try{
        await CategoryFind
        await ExpenseFind
        await res.redirect('/')
      }
      catch(err){
        console.log(err)
      }
    }
  merge()
})

router.delete('/:id', (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expenses.findOne({_id, userId})
  .then(expense => {
      expense.deleteOne()})
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

  module.exports = router
