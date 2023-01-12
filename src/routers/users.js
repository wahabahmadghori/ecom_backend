const express = require('express')
const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    res.send('User Data')
})

module.exports = userRouter