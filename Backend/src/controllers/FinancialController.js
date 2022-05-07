const financialModel = require('../modals/FinancialModal')
const AuthConstant = require('../constants/auth')
const FinancialModal = require('../modals/FinancialModal')
const http_cods = require('http-status-codes')

const addFinancialActivity = async (req, res) => {

    try {
        console.log(IsExistingActivity(req.body.activityID))
        const Isext = await IsExistingActivity(req.body.activityID);
        if(!Isext){
            const FinancialActivity = {
                type: req.body.type,
                amount: req.body.amount,
                description: req.body.description,
                date: req.body.date,
                ActivityId: ActivityId(req.body.type, req.body.date),
            }
            
            const createActivity = await financialModel.create(Activity)

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

const getAllActivites = async (req , res )=>{
    try{
        console.log(req)
        const activities = await FinancialModal.find();
        res.status(200).send(activities)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const getActivityById = async (req , res )=>{
    try{
        const activity = await financialModel.findById(req.params.id);
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

