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
      
        // console.log("6",appliPeople)
        const leaveModal = new leaveTypeModal({
            leaveName,
            annualLeaveNumber,
            monthLeaveNumber,
            salaryDeduction,
            description,
            applicablePeople
        })
        
    
        const addingResult = await leaveModal.save();
        if(addingResult){
            res.status(201).send(addingResult);
        }else{
            res.status(502).send("Something went wrong")
        }
    }catch(err){
        res.status(500).send(err)
    }
   
}


// Fetching all leave types
const fecthLeaves = async(req,res)=>{
     const fetchResult = await leaveTypeModal.find();
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
        const leaveName = req.body.leaveName;
        const annualLeaveNumber = req.body.annualLeaveNumber;
        const monthLeaveNumber = req.body.monthLeaveNumber;
        const salaryDeduction = req.body.salaryDeduction;
        const description = req.body.description;
        const applicablePeople = req.body.applicablePeople;
  
        const updatedLeaveData = new leaveTypeModal({
          leaveName,
          annualLeaveNumber,
          monthLeaveNumber,
          salaryDeduction,
          description,
          applicablePeople
        })
        console.log("data",updatedLeaveData);
        const updatedResult = leaveTypeModal.findByIdAndUpdate(leaveId,updatedLeaveData);
        console.log("*u",updatedResult);
        if(updatedResult){
            res.status(201).send(updatedResult)
        }else{
          res.status(502).send("Something went wrong when updating");
        }
    }catch(err){
        res.status(500).send(err);
    }
     
}

//Remove leave type

const deleteLeaveType = async(req,res)=>{
     const leaveId = req.params.id;

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