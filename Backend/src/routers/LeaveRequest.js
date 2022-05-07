const express = require("express");
const app = express.Router();
const leaveRequestController = require('../controllers/LeaveRequestController');
const emailController = require('../controllers/emailController');

//:POST method
app.post('/requestleave',leaveRequestController.applyLeave);

//:GET method to retrive data for one record
app.get('/getDataFor',leaveRequestController.getDataForOneRecord);

app.get('/getAllRequests',leaveRequestController.fecthAllRequests)

app.delete('/deleteApproved/:id',leaveRequestController.deleteApproveRequests)


app.post('/sendMails/:empName/:empEmail',emailController.sendEmails);

// app.get('/searchByDate/:date',leaveRequestController.search)

module.exports = app;
