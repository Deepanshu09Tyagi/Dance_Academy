const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/DDA").then(()=>{
    console.log("Server connected to database Succesfully...");
}).catch((e)=>{
    console.log(e);
})
