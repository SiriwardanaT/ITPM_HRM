const express = require('express')
const app = express.Router();
const userController = require('../controllers/FinanceController')


app.get('/',financeController.getActivities);

app.post('/add',financeController.addFinanceActivity);

app.get('/:id',financeController.getActivityById);

app.put('/:id',financeController.updateActivity)

module.exports = app;