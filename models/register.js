const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerSchema = new mongoose.Schema({
    First_Name:{
        type:String,
    },
    Last_Name:{
        type:String,
    },
    Email:{
        type:String,
        unique:true,
        trim:true
    },
    Phone:{
        type:Number,
        minlength:10,
        maxlength:10,
        unique:true
    },
    Password:{
        type:String,
        trim:true,
    },
    Confirm_Password:{
        type:String,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true,
            message:"Error"
        }
    }]
})

registerSchema.methods.generateAuthToken = async function(){
    const token =jwt.sign({_id:this.id.toString()},"thisisdeepanshudanceacademywebsite")
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token;
}


registerSchema.pre('save', async function(next){
    if(this.isModified("Password")){
        this.Password = await bcrypt.hash(this.Password, 10);
    }

    this.Confirm_Password = await bcrypt.hash(this.Password, 10);
    next();
})









const registerModel = new mongoose.model('Register', registerSchema);

module.exports = registerModel;