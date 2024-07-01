const express = require("express")
const route = express.Router()

route.use("/user", require("./userRouter"))
route.use("/task", require("./taskRouter"))
module.exports = route
