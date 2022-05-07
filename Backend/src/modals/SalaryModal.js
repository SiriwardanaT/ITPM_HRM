const mongoose  = require('mongoose')

const SalaryType = new mongoose.Schema({
    
    employeeID:{
        type:String,
        required:true
    },
   employeeName :{
       type:String,
       required:true
    },
    Month:{
        type:String,
        required:true
    },
    salaryType:{
        type:String,
        required:true,
       
    },
    amount:{
        type:String,
        required:true
    }
   
})

module.exports = mongoose.model("SalaryType",SalaryType);