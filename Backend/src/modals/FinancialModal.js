const mongoose  = require('mongoose')

const FinancialActivity = new mongoose.Schema({
    
    ActivityID:{
        type:String,
        required:true
    },
    type :{
       type:String,
       required:true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
       
    },
   date:{
        type:String,
        required:true
    },
    
   
})

module.exports = mongoose.model("FinancialActivity",Activity);