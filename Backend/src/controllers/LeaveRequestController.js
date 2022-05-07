const leaveRequest = require("../modals/LeaveRequestModal");
const nodemailer = require('nodemailer');

// const uploadFile = async (req, res) => {
//   try {
//     if (req.files) {
//       res.send({
//         status: false,
//         message: "No file Uploaded",
//       });
//     } else {
//       let attachments = req.files.attachments;

//       attachments.mv("./uploads/" + attachments.name);

//       res.send({
//         status: true,
//         message: "File is uploaded",
//         data: {
//           name: attachments.name,
//           mimetype: attachments.mimetype,
//           size: attachments.size,
//         },
//       });
//     }
//   } catch (err) {
//     res.status(err).send(err);
//   }
// };
const applyLeave = async (req, res) => {
  // const file1 = req.files.attachments;
  // console.log("file1",file1);
  // file1.mv(`./file/`+""+file1.name)
  try {
   const newRequest = new leaveRequest({
     empName : req.body.empName,
     empEmail : req.body.empEmail,
     leaveType:req.body.leaveType,
     noOfleaves : req.body.noOfleaves,
     days : req.body.days,
     attachments :""
    

   })
    // console.log("xx",req.files.attachments);
    const file1 = req.files.attachments;
    console.log("check",file1);
    const attch_url = uploadFile(file1);
    newRequest.attachments = attch_url;
 

    const result = await leaveRequest.create(newRequest);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(500).send("Something went wrong !");
    }
  } catch (err) {
    console.log(err);
  }
};

const uploadFile =(file)=>{
  const file_name = file.name;
  file.mv(`attachFile/`+file_name)
  const url = `http://localhost:5000/`+file_name;
  return url;

}



const getDataForOneRecord = async (req, res) => {
   
    const fetchOneData = await leaveRequest.find().limit(1).sort({$natural:-1});
    console.log("check",fetchOneData)
    if (fetchOneData) {
      res.status(201).send(fetchOneData);
    } else {
      res.status(502).send("Data fetching error for a one record");
    }
  };

  const fecthAllRequests = async (req, res) => {
    const fetchResult = await leaveRequest.find();
    if (fetchResult) {
      res.status(201).send(fetchResult);
    } else {
      res.status(502).send("Data fetching error");
    }
  };

  const deleteApproveRequests = async(req,res)=>{
    const leaveReqId = req.params.id;
    const deleteResult = await leaveRequest.findByIdAndDelete(leaveReqId);
  
    if (deleteResult) {
      res.status(201).send("Successfully Deleted!");
    } else {
      res.status(502).send("Something went wrong while deleting");
    }
  }
  

  const search= async(req,res)=>{
     const date = req.params.date;
     const  result = await leaveRequest.find(date);

     if(result){
       res.status(201).send("Successfully fetched")
     }else{
       res.status(502).send("Somwthing went wrong while searching")
     }
  }
 
module.exports = {
  applyLeave,
  getDataForOneRecord,
  fecthAllRequests,
  deleteApproveRequests,
  search

};
