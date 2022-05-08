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

//:GET method to get all leave requests
app.get('/getAllRequests',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),leaveRequestController.fecthAllRequests)

//:GET method to get employee leave requests
app.get('/getEmpOwnLeaves',Auth.IsAuthenticated,IsGrantAccess.AccessController(['User']),leaveRequestController.EmpOwnLeaveRequest)

//:PUT method to update status of leave
app.put('/updateStatus/:id',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),leaveRequestController.updateRequest);

//:POST method to send emails to employess
app.post('/sendMails/:empName/:empEmail/:action',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),emailController.sendEmails);



module.exports = app;
