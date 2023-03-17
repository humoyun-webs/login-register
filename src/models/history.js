class History{
    id;
    user;
    blog;
    status;
    constructor(id,blog,status,date = new Date().toLocaleString()){
this.id = id
this.status =status
this.blog = blog
this.date = date
    }
}
module.exports = {History}