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
      console.log(category.icon)
      const icon = category.icon
      Expenses.create({name,date,amount,userId,categoryId,icon})
        .then(() => {res.redirect('/')})
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})


router.get('/expense/edit', async (req, res) => {
    try{
        const userId = req.user._id
        await Expenses.find({ userId })
        await Expenses.lean()
        await Expenses.sort({date: 'asc'}) 
        await res.render('home',{expense})
        res.render('edit')
    } catch (error) {
        console.error(error)
    }
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

