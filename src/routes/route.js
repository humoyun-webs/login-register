const {Router} = require("express")
const { PostRegister, PostLogin, Getregister,Getlogin} = require("../controller/auth")
const {Home, PostBlog, Datas, Getbyid} = require("../controller/blog")
const isAuth = require("../middlewares/isAuth.middleware")
// const {} = require("../controller/home")

const routes = Router()

routes
.get("/",Home)
.post("/api/blog", PostBlog)
.get("/login",Getlogin)
.post("/api/login",PostLogin)
.get("/register",Getregister,isAuth)
.post("/api/register",PostRegister)
.get("/datas", Datas)
.get("/datas/:id",Getbyid)

module.exports = {routes}





