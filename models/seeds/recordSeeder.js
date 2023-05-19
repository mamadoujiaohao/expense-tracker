const bcrypt = require('bcryptjs')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../expense')
const User = require('../user')
const Category = require('../category')
const db = require('../../config/mongoose') // 呼叫mongoose裡的db

const SEED_USER1 = {
  name: '廣志',
  email: 'user1@example.com',
  password: '12345678'
}
const SEED_USER2 = {
  name: '小新',
  email: 'user2@example.com',
  password: '12345678'
}

// Mongoose 連線成功
db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({ // databast建立 seeder 資料
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(async user => {
      const userId = user._id
      const categoryNameOne = await Category.findOne({ name: '餐飲食品' })
      const categoryNameTwo = await Category.findOne({ name: '交通出行' })
      await Record.create({
        name: '午餐',
        amount: '200',
        date: '2023-05-06',
        userId: userId,
        categoryId: categoryNameOne._id,
        icon: categoryNameOne.icon
      })
      await Record.create({
        name: '汽車',
        amount: '9999',
        date: '2023-05-05',
        userId: userId,
        categoryId: categoryNameTwo._id,
        icon: categoryNameTwo.icon
      })
      console.log('done')
      process.exit()
    })
    .catch(error => console.log(error))
})