const express = require("express");
const app = express.Router();
const leaveRequestController = require('../controllers/LeaveRequestController');
const emailController = require('../controllers/emailController');
const Auth = require('../middleware/authMiddleware')
const IsGrantAccess = require('../middleware/AccessControll')

//:POST method
app.post('/requestleave',Auth.IsAuthenticated,IsGrantAccess.AccessController(['User']),leaveRequestController.applyLeave);

//:GET method to retrive data for one record
app.get('/getDataFor',Auth.IsAuthenticated,IsGrantAccess.AccessController(['User']),leaveRequestController.getDataForOneRecord);

app.get('/getAllRequests',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),leaveRequestController.fecthAllRequests)

app.get('/getEmpOwnLeaves',Auth.IsAuthenticated,IsGrantAccess.AccessController(['User']),leaveRequestController.EmpOwnLeaveRequest)

app.put('/updateStatus/:id',leaveRequestController.updateRequest);
app.post('/sendMails/:empName/:empEmail/:action',emailController.sendEmails);

// app.get('/searchByDate/:date',leaveRequestController.search)

module.exports = app;
