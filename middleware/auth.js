const jwt = require("jsonwebtoken");

const registerModel = require('../models/register')


const auth = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "thisisdeepanshudanceacademywebsite");

        const user = await registerModel.findOne({_id:verifyUser._id});

        next();
    }catch(err){
        res.status(401).send(err)
    }
}


module.exports = auth;