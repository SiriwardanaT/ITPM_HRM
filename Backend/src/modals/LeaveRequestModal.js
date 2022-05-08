const mongoose  = require('mongoose')

const LeaveRequest = new mongoose.Schema({
    
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
        
    },
    action:{
        type:String,
        default:"Pending"
    },
    empId:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    }
   
})
 
module.exports = mongoose.model("LeaveRequest",LeaveRequest);