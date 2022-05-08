const jwt = require('jsonwebtoken')
const constant = require('../constants/auth')
const IsAuthenticated =(req , res ,next)=>{
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    jwt.verify(token,constant.TOKEN_KEY,(err , decode)=>{
        if(err) res.status(401).send("Your are not Authenticated");
        else{
            req.body.curruntUserId = decode._id
            req.body.curruntEmail = decode.email,
            req.body.curruntName =  decode.name
            decode.isAdmin == 0 ?  req.body.curruntUserRole = constant.USER : req.body.curruntUserRole = constant.ADMIN
            next();
        }
    });

}


module.exports = {
    IsAuthenticated
}