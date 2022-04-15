const leaveTypeModal = require("../modals/LeaveTypeModal");

// Create new Leave type
const createLeave=async(req,res)=>{
    try{
        const leaveName = req.body.leaveName;
        const annualLeaveNumber = req.body.annualLeaveNumber;
        const monthLeaveNumber = req.body.monthLeaveNumber;
        const salaryDeduction = req.body.salaryDeduction;
        const description = req.body.description;
        const applicablePeople = req.body.applicablePeople;
      
        console.log("1",leaveName)
        console.log("2",annualLeaveNumber)
        console.log("3",monthLeaveNumber)
        console.log("4",salaryDeduction)
        const leaveModal = new leaveTypeModal({
            leaveName,
            annualLeaveNumber,
            monthLeaveNumber,
            salaryDeduction,
            description,
            applicablePeople
        })
        // console.log("dd",leaveModal)
    
        const addingResult = await leaveModal.save();
        if(addingResult){
            res.status(201).send(addingResult);
        }else{
            res.status(502).send("Something went wrong")
        }
    }catch(err){
        res.status(500).send(err)
        console.log("err",err);
    }
   
}


// Fetching all leave types
const fecthLeaves = async(req,res)=>{
     const fetchResult = await leaveTypeModal.find();
     console.log("fetched",fetchResult);
     if(fetchResult){
         res.status(201).send(fetchResult)
     }else{
         res.status(502).send("Data fetching error");
     }
}

//Update leave type
const updateLeaveType = async(req,res)=>{
    try{
        const leaveId = req.params.id;
        console.log("id",leaveId)
        const {leaveName,annualLeaveNumber,monthLeaveNumber,salaryDeduction,description,applicablePeople} = req.body;
        const updatedLeaveData = new leaveTypeModal({
           
          leaveName,
          annualLeaveNumber,
          monthLeaveNumber,
          salaryDeduction,
          description,
          applicablePeople
        })
        console.log("data1",leaveName);
        console.log("data",updatedLeaveData);
        const updatedResult = await leaveTypeModal.findByIdAndUpdate(leaveId,leaveName,annualLeaveNumber,monthLeaveNumber,salaryDeduction,description,applicablePeople);
        console.log("*u",updatedResult);
        if(updatedResult){
            res.status(201).send(updatedResult)
        }else if(err){
          res.status(502).send("Something went wrong while updating data");
        }
    }catch(err){
        res.status(500).send(err);
    }
     
}

//Remove leave type

const deleteLeaveType = async(req,res)=>{
     const leaveId = req.params.id;
    console.log("*",leaveId)
     const deleteResult = await leaveTypeModal.findByIdAndDelete(leaveId);

     if(deleteResult){
        res.status(201).send("Successfully Deleted!")

     }else{
        res.status(502).send("Something went wrong while deleting");
      }

}


module.exports={
createLeave,
fecthLeaves,
updateLeaveType,
deleteLeaveType
}