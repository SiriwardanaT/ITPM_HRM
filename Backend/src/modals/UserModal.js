const mongoose  = require('mongoose')

const User = new mongoose.Schema({
     
    employeeId :{
        type:String,
        required:true
    },
    employeeName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    birthData:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    jobRole:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    profile_img:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    
})

module.exports = mongoose.model("User",User);