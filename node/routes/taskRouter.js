const express = require("express")
const taskRoute = express.Router()
const { createTask, getTask, deleteTask, updateTask, getParticularTask } = require("../controller/taskController")
const { upload } = require('../utitlity/middleware/uploadImage')
const apiAuth = require("../utitlity/middleware/apiAuth")
taskRoute.post('/create', apiAuth, upload.single('file'), createTask)
taskRoute.get('/', apiAuth, getTask)
taskRoute.delete('/:id', apiAuth, deleteTask)
taskRoute.patch('/:id', apiAuth, upload.single('file'), updateTask)
taskRoute.get('/:id', apiAuth, getParticularTask)

module.exports = taskRoute