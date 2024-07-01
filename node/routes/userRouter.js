const express = require("express")
const userRoute = express.Router()
const { signUp, signIn } = require("../controller/userController")

userRoute.post('/signUp', signUp)
userRoute.post('/signIn', signIn)

module.exports = userRoute