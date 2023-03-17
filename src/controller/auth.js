const Io = require('../utils/Io')
const Users = new Io("./src/db/registration.json")
const {Registration} = require('../models/registration.js')
const bcrypt = require("bcrypt")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const {v4:uuid} = require("uuid")


const Getregister = (req,res)=>{
    try{
res.render("register")
    }catch(error){
console.log(error.message);
    }
}
const Getlogin = (req,res)=>{
    try{
res.render("login")
    }catch(error){
console.log(error.message);
    }
}

const PostRegister = async (req,res) =>{
    try{ 
         const {ism ,username, password} = req.body;
         const {image} = req.files;
         

      const users = await Users.read()
      const format = image.mimetype.split("/")[1];
      const path = `${process.cwd()}/src/upload/${uuid()}.${format}`;
      const scheme = Joi.object({
        ism:Joi.string().required(),
        username:Joi.string().alphanum().required(),
        password:Joi.string().required(),
        
     })
     const {error} = scheme.validate(req.body)

     const id = (users[users.length - 1]?.id || 0 ) + 1
     const hashedPass = await bcrypt.hash(password,12)
     const ImageLink = `${process.cwd()}"upload"${image.name}.${format}`;
     const newUser = new Registration (id, ism, username, hashedPass,ImageLink)
     const allUser = users.length ? [...users,newUser] : [newUser]

     const token = jwt.sign(newUser.username , process.env.Secret_Key)

    
     res.cookie("token",token)
     
     

     if(error){
     throw error
     }
     
     Users.write(allUser)
     image.mv(path);
     res.redirect("/login")

    }catch(error){
console.log(error.message);
    }
}
const PostLogin = async (req,res) =>{
    try{
     const {username, password} = req.body
     const users = await Users.read()
     const user = users.find(el=>el.username.toLowerCase() == username.toLowerCase())

     if(!user) {return res.redirect("/register")}

     
    const verified = await bcrypt.compare(password, user.password)
    if(!verified){
       return res.redirect("/register")
    // console.log("bad login");
    }else{
      return res.redirect("/")
    // console.log("nice login");
    }
    
    }catch(error){
console.log(error.message);
    }
}
module.exports = {Getregister, PostRegister,Getlogin,PostLogin}
