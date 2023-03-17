const Io = require("../utils/Io");
const Blogs = new Io("./src/db/blog.json");
const Histories = new Io ("./src/db/history.json");
const {Blog} = require("../models/blog");
const {v4:uuid} = require("uuid");
const Joi = require("joi");
const {History} = require("../models/history.js")


const Home = async  (req, res) => {
    try{
        res.render("blog");
        const {status} = req.body
        const histories = Histories.read()
        const method = req.body.status = "METHOD: Get;";
        const count = (histories[histories.length + 1]?.count || 0) + 1;
        const newHistory = new History(method,count)
        const allHistories = histories.length ? [newHistory] : [newHistory];
        Histories.write(allHistories)
        
    }catch(error){
console.log(error.message);
    }
  };

const Datas = async (req,res) =>{
    const blogs = await Blogs.read()

    res.send(blogs)
}







  
  const PostBlog = async (req,res)=>{
   try{
    const {title, text} = req.body;
    const {image} = req.files;
    

 const blogs = await Blogs.read()
 const history = await Histories.read()
 
 const format = image.mimetype.split("/")[1];
 const path = `${process.cwd()}/src/upload/${uuid()}.${format}`;
 const scheme = Joi.object({
   title:Joi.string().required(),
   text:Joi.string().alphanum().required(),
   
})
const {error} = scheme.validate(req.body)

const id = (blogs[blogs.length - 1]?.id || 0 ) + 1
const ImageLink = `${process.cwd()}"upload"${image.name}.${format}`;
const newBlogs = new Blog (id, title, text, ImageLink)
const allBlogs = blogs.length ? [...blogs,newBlogs] : [newBlogs]

if(error){
throw error
}

Blogs.write(allBlogs)
image.mv(path);
res.redirect("/datas")

   }catch(error){
    console.log(error.mess);
   }
  }


  const Getbyid = async (req,res) =>{
    try {
        const {id} = req.params
     const blogs = await Blogs.read()
     const blog = blogs[id -1]
     const allblogs = blogs.filter((el)=>{
        if(el.id == blog.id){
            return el
        }
     })
     
     res.status(200).json(allblogs)
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  }
  module.exports = {Home,PostBlog,Datas,Getbyid}