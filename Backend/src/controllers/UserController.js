const userModel = require('../modals/UserModal')
const AuthConstant = require('../constants/auth')
const UserModal = require('../modals/UserModal')
//add employee 
const addEmployee = async (req, res) => {
    try {
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
        const createUser = await userModel.create(User)
        if (createUser) {
            res.status(201).send(createUser)
        }
        else {
            res.status(500).send("Something went wrong")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}
//get all
const getAllEmployees = async (req , res )=>{
    try{
        const employees = await UserModal.find();
        res.status(200).send(employees)
    }
    catch(err){
        res.status(500).send(err)
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

module.exports = {
    addEmployee,
    getAllEmployees
}

