const nodemailer = require('nodemailer');
const constants_for_email = require('../constants/emails');

const sendEmails =(req,res)=>{
  console.log("ddddddddddddddddddddddd")
    const name = req.params.empName;
    const email = req.params.empEmail;
    const action = req.params.action;
    console.log("body",req.body);
    console.log("cc",name,email,action)

   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'itpm.hrm@gmail.com',
       pass: 'Tharu724*',
      
     }
   });
  //  console.log("tt",transporter)
   if(action == 'Approve'){
    let mailOptions = {
      from: name,
      to: email,
      subject: 'Status of the requested leave',
      text: `Hi ${name} , 
      
             Your leave request is approved by the admin. Enjoy your holiday!!!
             
             Thanks and Best Regards.
             
             `
    };
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
   }
     
  
   
    
    

   




}

module.exports ={
 sendEmails
} 
