const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')
const Categories = require('../../models/category');
const category = require('../../models/category');

router.get("/new", (req, res) => {
    Categories.find()
      .lean()
      .then((category) => {
        res.render("new", { category });
      });
  });

router.post('/new', (req, res) => {
    const userId = req.user._id
    const {name ,date,amount,categoryId} = req.body 
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
    
// router.get('/:id/edit', (req, res) => {
//   const userId = req.user._id
//   const _id = req.params.id
//   Expenses.findOne({_id, userId})
//   .lean()
//   .then((expense) => {
//     const {name,date,amount,userId,categoryId,icon} = expense

//     console.log(expense)
//   })
//   .catch(error => console.error(error))

//   Categories.find()
//       .lean()
//       .then((category) => {
//       })

//       res.render('edit', {expense})
// })  


router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  Expenses.findOne({ _id, userId })
    .lean()
    .then(expense => {
      expense.date = expense.date.toISOString().slice(0, 10)
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


  module.exports = router




//   //show pages(should be lower)
// router.get('/:id', (req, res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     return Restaurants.findOne({_id, userId})
//     .lean()
//     .then((restaurant) => {res.render('show', {restaurant})})
//     .catch(error => console.error(error))
// })

//   //edit page
// router.get('/:id/edit', (req, res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     return Restaurants.findOne({_id, userId})
//     .lean()
//     .then((restaurant) => {res.render('edit', {restaurant})})
//     .catch(error => console.error(error))
// })

// router.put('/:id', (req, res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     const {name,name_en,category,image,location,phone,google_map,rating,description} = req.body
//     return Restaurants.findOne({_id, userId})
//     .then((restaurant) => {
//         restaurant.name = name
//         restaurant.name_en = name_en
//         restaurant.category = category
//         restaurant.image = image
//         restaurant.location = location
//         restaurant.phone = phone
//         restaurant.google_map
//         restaurant.rating = rating
//         restaurant.description = description
//         return restaurant.save()
//     })
//     .then((restaurant) => {res.redirect(`/restaurants/${id}`)})
//     .catch(error => console.error(error))
// })

// //delete function
// router.delete('/:id', (req,res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     return Restaurants.findOne({_id, userId})
//     .then(restaurant => {
//         restaurant.deleteOne()})
//     .then(() => res.redirect('/'))
//     .catch(error => console.error(error))
// })

