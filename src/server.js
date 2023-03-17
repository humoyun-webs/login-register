const express = require("express")
require("dotenv").config()
const app = express()
const {routes} = require("./routes/route.js")
const cookie = require("cookie-parser")
const fileUpload = require("express-fileupload")
app.use(express.urlencoded({ extended: true }));

const Port = process.env.Port || 1334;

app.use(express.json())
app.use(fileUpload())
app.use(cookie());
app.use(routes)

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

app.use("/image/",express.static(process.cwd() + "/upload"))

app.use("*",(_,res)=>{
res.redirect("/register")
})

app.listen(Port,()=>{
    console.log(`http://localhost:${Port}/register connecting` );
})