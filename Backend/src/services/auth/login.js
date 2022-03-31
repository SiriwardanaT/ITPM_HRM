//login
const Login =(req , res )=>{
    
  console.log(req.body.name);
  res.send("login");
}

module.exports = {
    Login
}