const express = require('express')
const app = express.Router();
const leaveController = require('../controllers/LeaveTypeController');


//:POST method
app.post('/addLeave',leaveController.createLeave);

//:GET method
app.get('/getLeave',leaveController.fecthLeaves);

//:GET method to retrive data for one record
app.get('/getDataFor/:id',leaveController.getDataForOneRecord);

//:PUT method
app.put('/updateLeave/:id',leaveController.updateLeaveType);

//:DELETE method
app.delete('/deleteLeave/:id',leaveController.deleteLeaveType);


module.exports = app;