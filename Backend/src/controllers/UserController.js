const userModel = require('../modals/UserModal')
const AuthConstant = require('../constants/auth')
const UserModal = require('../modals/UserModal')
const http_cods = require('http-status-codes')
const nodemailer = require('nodemailer');
//add employee 
const addEmployee = async (req, res) => {

    try {
        console.log(IsExistingEmployee(req.body.Nic))
        const Isext = await IsExistingEmployee(req.body.Nic);
        if(!Isext){
            const User = {
                employeeName: req.body.employeeName,
                phone: req.body.phone,
                Nic: req.body.Nic,
                email: req.body.email,
                birthData: req.body.birthData,
                address: req.body.address,
                jobRole: req.body.jobRole,
                employeeId: GenerateEmpId(req.body.jobRole, req.body.Nic),
                isAdmin: getAdminAccess(req.body.jobRole),
                gender: req.body.gender,
                profile_img: "",
                password: req.body.password
            }
            const file1 = req.files.profile;
            const profile_url = uploadProfileImage(file1,User.Nic);
            User.profile_img = profile_url;
            const createUser = await userModel.create(User)

            if (createUser) {
                const IsSend = sendmail(User.email,User.employeeName,User.password)
                if(IsSend){
                    res.status(http_cods.StatusCodes.CREATED).send(createUser)
                }
                else{
                    res.status(http_cods.StatusCodes.OK).send("User Created But Email not sent")
                }
               
            }
            else {
                res.status(http_cods.StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong")
            }
        }
        else{
            res.status(http_cods.StatusCodes.CONFLICT).send(http_cods.ReasonPhrases.CONFLICT)
        }
        
    }
    catch (err) {
        res.status(500).send(err)
    }
}
//get all
const getAllEmployees = async (req , res )=>{
    try{
        console.log(req)
        const employees = await UserModal.find();
        res.status(200).send(employees)
    }
    catch(err){
        res.status(500).send(err)
    }
}
//find existing employee 
const IsExistingEmployee = async (nic)=>{
    try{
        const user = await UserModal.findOne({"Nic":nic});
        console.log(user)
        if(user != null){
            return true
        }
        else{
            return false
        }
    }
    catch(err){
        return false;
    }
   

}
const getEmployeeById = async (req , res )=>{
    try{
        const user = await userModel.findById(req.params.id);
        if(user){
            res.status(http_cods.StatusCodes.OK).send(user);
        }
        else{
            res.send(http_cods.StatusCodes.NOT_FOUND).send(http_cods.ReasonPhrases.NOT_FOUND);
        }
    }
    catch(err){
        res.status(500).send(err);
    }

}
const getUserProfile = async ( req , res )=>{
    try{
        const user = await userModel.findOne({"_id":req.body.curruntUserId});
        if(user){
            res.status(http_cods.StatusCodes.OK).send(user);
        }
        else{
            res.send(http_cods.StatusCodes.NOT_FOUND).send(http_cods.ReasonPhrases.NOT_FOUND);
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

const updateEmployee = async (req , res )=>{
         try{
           
            const updateUser = await UserModal.updateOne({"_id":req.params.id},
            {
                $set:{
                    employeeName: req.body.employeeName,
                    phone: req.body.phone,
                    Nic: req.body.Nic,
                    email: req.body.email,
                    birthData: req.body.birthData,
                    address: req.body.address,
                    jobRole: req.body.jobRole,
                    gender: req.body.gender,
                    status:req.body.status
                }
            })
            if(updateUser.modifiedCount == 1){
                res.status(http_cods.StatusCodes.OK).send(http_cods.ReasonPhrases.OK)
            }
            else{
                res.status(http_cods.StatusCodes.NOT_MODIFIED).send(http_cods.ReasonPhrases.NOT_MODIFIED)
            }
         }
         catch(err){
                res.status(500).send("error occure")
         }
}


const DeleteEmployee = async (req, res)=>{
     const IsDelete = await UserModal.remove({"_id":req.params.id});
     console.log(IsDelete);
     if(IsDelete.deletedCount == 1){
        res.status(200).send("Delete");
     }
     else{
        res.status(500).send("Not Delete")
     }
}

//helper methods
const GenerateEmpId = (role, Nic) => {
    if (role == "Junior Executive" || role == "Manager") {
        const id = "HR" + new Date().getFullYear().toString().substring(2, 4) + Nic.substring(0, 4);
        return id
    }
    else {
        const id = "SE" + new Date().getFullYear().toString().substring(2, 4) + Nic.substring(0, 4);
        return id
    }

}
const getAdminAccess = (role) => {
    console.log(role)
    if (role == "Junior Executive" || role == "Manager") {
        return AuthConstant.ADMIN_PRIVILLADGE_ACCEPTED;
    }
    else {
        return AuthConstant.ADMIN_PRIVILLADGE_REJECTED;
    }
}
const uploadProfileImage =(file,nic)=>{
    const file_name = nic+"-"+file.name;
    file.mv(`img/`+file_name)
    const url = `http://localhost:5000/`+file_name;
    return url;

}
const sendmail = async (email,username,password)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'itpm.hrm@gmail.com',
          pass: 'Tharu724*',
         
        }
      });
    
      let mailOptions = {
        from:'itpm.hrm@gmail.com',
        to: email,
        subject: 'HRM Login Details',
        text: `Hi ${username} , 
        
               Your HRM Account is created and Use the below information to login to the system. Please change the password ones you signed in.
               
               Username : ${username},
               Password : ${password} (please update after login)

               Go to the Login : http://localhost:8081/auth/login"
               
               Thanks and Best Regards.

               
               `
      };
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
          return false;
        } else {
          console.log("Email sent successfully");
          return true;
        }
      });
    
}

module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    getUserProfile,
    DeleteEmployee

}

