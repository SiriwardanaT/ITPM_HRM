const express = require('express')
const app = express.Router();
const leaveController = require('../controllers/LeaveTypeController');
const Auth = require('../middleware/authMiddleware')
const IsGrantAccess = require('../middleware/AccessControll')


//:POST method
app.post('/addLeave',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),leaveController.createLeave);

//:GET method
app.get('/getLeave',Auth.IsAuthenticated,IsGrantAccess.AccessController(['User','Admin']),leaveController.fecthLeaves);

//:GET method to retrive data for one record
app.get('/getDataFor/:id',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),leaveController.getDataForOneRecord);

//:PUT method
app.put('/updateLeave/:id',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),leaveController.updateLeaveType);

//:DELETE method
app.delete('/deleteLeave/:id',Auth.IsAuthenticated,IsGrantAccess.AccessController(['Admin']),leaveController.deleteLeaveType);


module.exports = app;