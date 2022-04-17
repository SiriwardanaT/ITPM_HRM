const mongoose  = require('mongoose')

const Activity = new mongoose.Schema({
     
    ActivityID :{
        type:String,
        required:true,
        unique:true
    },
    ActivityType:{
        type:String,
        required:true
    },
    Date :{
       type:Date,
       required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Activity",FinanceActivity);