const mongoose  = require('mongoose')

const LeaveType = new mongoose.Schema({
    
    leaveName:{
        type:String,
        required:true
    },
   annualLeaveNumber :{
       type:String,
       required:true
    },
    monthLeaveNumber:{
        type:String,
        required:true
    },
    salaryDeduction:{
        type:String,
        required:true,
       
    },
   description:{
        type:String,
        required:true
    },
    applicablePeople:[{
        type:String,
        required:true
    }]
   
})

module.exports = mongoose.model("LeaveType",LeaveType);