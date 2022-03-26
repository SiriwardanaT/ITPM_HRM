const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
//=========== MIDDLEWARE USAGE ======= //

app.use(cors());

//=========== DATABASE CONNECTION ===== //

mongoose.connect(process.env.DB_Cloud)
.then((connect =>{
    console.log("Database connected")
})).catch(err =>{
    console.log(err)
})
app.get('/',(req,res)=>{
    res.send("ok")
})
//=========== SERVER CONFIGIRATIONS ====== //
//http://localhost:5000/
const port = process.env.PORT || 5080
app.listen(port,()=>{
    console.log('server run in port '+port);
});