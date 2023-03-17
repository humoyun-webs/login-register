class Registration{
    id;
    username;
    ism;
    password;
    image;
    ImageLink;
    
    constructor(id, ism, username, password,image, ImageLink){
        this.id = id;
        this.ism = ism
        this.username = username;
        this.password = password;
        this.image = image;
        this.ImageLink = ImageLink
    }
}
module.exports = {Registration}