const express = require('express')
const app = express.Router();
const leaveController = require('../controllers/FinancialController');



app.post('/addSalary',financialController.addSalary);

app.get('/getSalary',financialController.getSalary);


app.put('/updateSalary/:id',financialController.updateSalary);


app.delete('/deleteSalary/:id',financialController.deleteSalary);


module.exports = app;