const express = require('express')
const app = express.Router();
const userController = require('../controllers/UserController')

//:GET http://localhost:5000/user/
app.get('/',userController.getAllEmployees);

//:POST http://localhost:5000/user/add
app.post('/add',userController.addEmployee);

//:GET http://localhost:5000/user/123
app.get('/:id',userController.getEmployeeById);

//:PUThttp://localhost:5000/user/add
app.put('/:id',userController.updateEmployee)
module.exports = app;