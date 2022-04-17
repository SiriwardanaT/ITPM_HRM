const express = require('express')
const app = express.Router();
const userController = require('../controllers/FinanceController')

//:GET http://localhost:5000/user/
app.get('/',financeController.getActivities);

//:POST http://localhost:5000/user/add
app.post('/add',financeController.addFinanceActivity);

//:GET http://localhost:5000/user/123
app.get('/:id',financeController.getActivityById);

//:PUThttp://localhost:5000/user/add
app.put('/:id',financeController.updateActivity)
module.exports = app;