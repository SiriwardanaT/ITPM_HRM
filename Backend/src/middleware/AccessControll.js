function AccessController(role){
       return (req,res, next)=>{            
            const isAccess = role.includes(req.body.curruntUserRole)
            if(isAccess){
                //grant access
                next(); 
            }
            else{
                res.status(401).send("Access denied !")
            }
       }
}

module.exports = {
    AccessController
}