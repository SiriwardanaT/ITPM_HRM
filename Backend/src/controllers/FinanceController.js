const financeModel = require('../modals/FinanceModal')
const AuthConstant = require('../constants/auth')
const FinanceModal = require('../modals/FinanceModal')
const http_cods = require('http-status-codes')

const addFinanceActivity = async (req, res) => {
    try {
        
        if(!Isext){
            const FincanceActivity = {
                ActivityType: req.body.actType,
                Amount: req.body.amount,
                Description: req.body.desc,
                Date: req.body.date,
                ActivityID: req.body.actID
                
            }
            const addFinanceActivity = await financeModel.create(Activity)
            if (createActivity) {
                res.status(http_cods.StatusCodes.CREATED).send(createActivity)
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

const getActivities = async (req , res )=>{
    try{
        const activities = await FinanceModal.find();
        res.status(200).send(activities)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const getActivityById = async (req , res )=>{
    try{
        const user = await financeModel.findById(req.params.id);
        if(activity){
            res.status(http_cods.StatusCodes.OK).send(activity);
        }
        else{
            res.send(http_cods.StatusCodes.NOT_FOUND).send(http_cods.ReasonPhrases.NOT_FOUND);
        }
    }
    catch(err){
        res.status(500).send(err);
    }

}

const updateActivity = async (req , res )=>{
         try{
            const updateActivity = await FinanceModal.updateOne({"_id":req.params.id},
            {
                $set:{
                    ActivityType: req.body.actType,
                    Amount: req.body.amount,
                    Description: req.body.desc,
                    Date: req.body.date,
                    ActivityID: req.body.actID
                }
            })
            if(updateActivity.modifiedCount == 1){
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

const GenActivityID = (actType, date) => {
        const id = actType + new Date().getFullYear();
        return id
   
}


module.exports = {
    updateActivity,
    getActivityById,
    addFinanceActivity,
    getActivities
}

