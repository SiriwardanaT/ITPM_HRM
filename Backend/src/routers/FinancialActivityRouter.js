const express = require('express')
const app = express.Router();
const leaveController = require('../controllers/FinancialController');



app.post('/addActivity',financialController.addActivity);

app.get('/getActivity',financialController.getActivity);


app.put('/updateActivity/:id',financialController.updateActivity);


app.delete('/deleteActivity/:id',financialController.deleteActivity);


module.exports = app;