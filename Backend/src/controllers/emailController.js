const nodemailer = require('nodemailer');
const constants_for_email = require('../constants/emails');

const sendEmails =(req,res)=>{
 
    const name = req.params.empName;
    const email = req.params.empEmail;
    const action = req.params.action;

   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: constants_for_email.EMAIL_CONSTANSTS.USER_EMAIL,
       pass: constants_for_email.EMAIL_CONSTANSTS.USER_PASSWORD,
      
     }
   });
  
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
   if(action == 'Reject'){
    let mailOptions = {
      from: name,
      to: email,
      subject: 'Status of the requested leave',
      text: `Hi ${name} , 
      
             Your leave request is Rejected by the admin.
             
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
