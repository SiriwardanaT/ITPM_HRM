const leaveRequest = require("../modals/LeaveRequestModal");

const applyLeave = async (req, res) => {
 console.log("id",req.body.curruntUserId);
  try {
   const newRequest = new leaveRequest({
     
    empId:req.body.curruntUserId,
    leaveType:req.body.leaveType,
     noOfleaves : req.body.noOfleaves,
     days : req.body.days,
     attachments :""
    

   })
    
    const file1 = req.files.attachments;
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
    if (fetchOneData) {
      res.status(201).send(fetchOneData);
    } else {
      res.status(502).send("Data fetching error for a one record");
    }
  };

  const fecthAllRequests = async (req, res) => {
    const fetchResult = await leaveRequest.find().populate("empId");
    console.log("fetch",fetchResult);
    if (fetchResult) {
      res.status(201).send(fetchResult);
    } else {
      res.status(502).send("Data fetching error");
    }
  };

  const EmpOwnLeaveRequest = async(req,res)=>{
    const result = await leaveRequest.find({
      empId:req.body.curruntUserId
    });
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(502).send("Data fetching error");
    } 
  }

 const updateRequest = async(req,res)=>{
    const leaveReqId = req.params.id;
    const action = req.body.action;

    const updateResult = await leaveRequest.updateOne(
      {_id:leaveReqId},
      {
        $set:{
          action
        }
      }
    )

    if(updateResult){
      res.status(201).send(updateResult)
    }else{
      res.status(502).send("error");
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
  search,
  updateRequest,
  EmpOwnLeaveRequest

};
