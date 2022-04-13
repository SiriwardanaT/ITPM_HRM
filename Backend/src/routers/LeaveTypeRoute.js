const express = require('express')
const app = express.Router();
const leaveController = require('../controllers/LeaveTypeController');


//:POST method
app.post('/addLeave',leaveController.createLeave);

//:GET method
app.get('/getLeave',leaveController.fecthLeaves);

//:PUT method
app.put('/updateLeave/:id',leaveController.updateLeaveType);

//:DELETE method
app.delete('/deleteLeave/:id',leaveController.deleteLeaveType);


module.exports = app;