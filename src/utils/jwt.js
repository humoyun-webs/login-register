const jwt = require("jsonwebtoken")

const sign = (playload) =>{
    jwt.sign(playload,process.env.Secret_Key, {expiresIn: "12h"})
}

const verify = (playload) =>{
    jwt.verify(playload,process.env.Secret_Key)
}
module.exports = {
    sign , verify
}