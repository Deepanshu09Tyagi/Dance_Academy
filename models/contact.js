const mongoose = require("mongoose");

const contactform = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }
})




const contactmodel = new mongoose.model('Contact', contactform);

module.exports = contactmodel;