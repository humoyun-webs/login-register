const { verify } = require("../utils/jwt");


const isAuth =  (req,res,next)=>{
try{
    
    const {token} = req.cookies;
    if(!token){
        res.redirect("/register")
    }
    
    const isverified = verify(token)

    req.user = isverified;
    next()
}catch(error){
res.redirect("/register")
}

}
module.exports = isAuth