const mongoose  = require('mongoose')

const LeaveRequest = new mongoose.Schema({
    
    empName:{
        type:String,
        required:true
    },
   empEmail :{
       type:String,
       required:true
    },
    leaveType:{
        type:String,
        required:true
    },
    noOfleaves:{
       type:Number,
       required:true
    },

    days:[{
        type:String,
        required:true
    }],
    attachments:{
        type:String
        
    }
   
})
 
module.exports = mongoose.model("LeaveRequest",LeaveRequest);