const mongoose  = require('mongoose')

const LeaveType = new mongoose.Schema({
    
    leaveName:{
        type:String,
        required:true
    },
   annualLeaveNumber :{
       type:Number,
       required:true
    },
    monthLeaveNumber:{
        type:Number,
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