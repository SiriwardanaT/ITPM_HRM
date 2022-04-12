const express = require('express')
const app = express.Router();
const userController = require('../controllers/UserController')

//:GET http://localhost:5000/user/
app.get('/',userController.getAllEmployees)

//:POST http://localhost:5000/user/add
app.post('/add',userController.addEmployee)


module.exports = app;