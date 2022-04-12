const UserModal = require("../modals/UserModal");
const jwt = require("jsonwebtoken");
const auth_constant = require("../constants/auth");
const statuscode = require("http-status-codes");

//login
const login = async (req, res) => {
    //check null values
    try {
        if (req.body.employeeName != null && req.body.password != null) {
            const extUser = await UserModal.findOne({
                employeeName: req.body.employeeName,
                password: req.body.password,
            });
            console.log(extUser)
            if (extUser) {
                const token = jwt.sign(
                    {
                        _id: extUser._id,
                        isAdmin: extUser.isAdmin,
                    },
                    auth_constant.TOKEN_KEY
                );
                res.status(statuscode.StatusCodes.ACCEPTED).json({token:token,jobRole:extUser.jobRole,name:extUser.employeeName,isAdmin:extUser.isAdmin});
            } else {
                res.status(statuscode.StatusCodes.NOT_FOUND).send(statuscode.ReasonPhrases.NOT_FOUND);
            }
        } else {
            res.status(statuscode.StatusCodes.NO_CONTENT).send("Employee ID or Password cannot be Null");
        }
    } catch (err) {
        res.status(500).send(statuscode.ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    login
};
