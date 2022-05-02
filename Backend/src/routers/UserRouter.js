const express = require('express')
const app = express.Router();
const userController = require('../controllers/UserController')
const Auth = require('../middleware/authMiddleware')

//:GET http://localhost:5000/user/
app.get('/',Auth.IsAuthenticated,userController.getAllEmployees);

//:POST http://localhost:5000/user/add
app.post('/add',userController.addEmployee);

//:GET http://localhost:5000/user/123
app.get('/:id',userController.getEmployeeById);

//:GET http://localhost:5000/user/my
app.get('/profile/my',Auth.IsAuthenticated,userController.getUserProfile)

//:PUThttp://localhost:5000/user/add
app.put('/:id',userController.updateEmployee)
module.exports = app;