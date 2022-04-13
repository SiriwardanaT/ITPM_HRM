const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config();

//=========== MIDDLEWARE USAGE ======= //
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors());

//========== router import ==========  //
const login = require('./src/routers/auth/LoginRouter')
const userRouter = require('./src/routers/UserRouter')
const leaveTypeRouter = require('./src/routers/LeaveTypeRoute');

//========= router middlware usage ===== //
app.use('/auth',login)
app.use('/user',userRouter)
app.use('/leaveType',leaveTypeRouter);



//=========== DATABASE CONNECTION ===== //

mongoose.connect(process.env.DB_Cloud)
.then((connect =>{
    console.log(" Database connected Success ")
})).catch(err =>{
    console.log(err)
})




//=========== SERVER CONFIGIRATIONS ====== //
//http://localhost:5000/
const port = process.env.PORT || 5080
app.listen(port,()=>{
    console.log('server run in port '+port);
});



