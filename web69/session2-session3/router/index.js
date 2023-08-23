
const router = require('express').Router()
const userRouter = require('./user')
const customerRouter = require('./customer')
const productRouter = require("./product")

router.use('/user' ,userRouter)
router.use('/customer',customerRouter )
router.use('/product', productRouter)

module.exports = router