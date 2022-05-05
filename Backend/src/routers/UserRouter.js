const express = require('express')
const app = express.Router();
const userController = require('../controllers/UserController')
const Auth = require('../middleware/authMiddleware')
const IsGrantAccess = require('../middleware/AccessControll')

//:GET http://localhost:5000/user/
app.get('/',Auth.IsAuthenticated,userController.getAllEmployees);

//:POST http://localhost:5000/user/add
app.post('/add',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),userController.addEmployee);

//:GET http://localhost:5000/user/123
app.get('/:id',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),userController.getEmployeeById);

//:GET http://localhost:5000/user/my
app.get('/profile/my',Auth.IsAuthenticated,IsGrantAccess.AccessController(['User','Admin']),userController.getUserProfile)

//:PUThttp://localhost:5000/user/add
app.put('/:id',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin','User']),userController.updateEmployee)

app.delete('/:id',userController.DeleteEmployee)
module.exports = app;