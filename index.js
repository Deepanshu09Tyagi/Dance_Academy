const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
require("./db/conn")
const contactmodel = require('./models/contact');
const registerModel = require('./models/register');
const auth = require("./middleware/auth")


const app = express();
const PORT = 3000;

const static_Path = path.join(__dirname, "./public");
const dynamic_Path = path.join(__dirname, "./templates/views");
const partials_Path = path.join(__dirname,"./templates/partials");


app.set('view engine','hbs');
app.set('views',dynamic_Path);
hbs.registerPartials(partials_Path);
app.use('/public',express.static(static_Path))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/course/belly",(req,res)=>{
    res.render("belly",{dance:"Belly"});
})

app.get("/course/contemporary",(req,res)=>{
    res.render("contemporary",{dance:"Contemporary"});
})

app.get("/course/bollywood",(req,res)=>{
    res.render("bollywood",{dance:"Bollywood"});
})

app.get("/course/hiphop",(req,res)=>{
    res.render("hiphop",{dance:"HipHop"});
})

app.get("/course/salsa",(req,res)=>{
    res.render("salsa",{dance:"Salsa"});
})

app.get("/course/parkour",(req,res)=>{
    res.render("parkour",{dance:"Parkour"});
})

app.get("/course/workout",(req,res)=>{
    res.render("workout",{dance:"Workout"});
})

app.get("/events/wedding",(req,res)=>{
    res.render("wedding")
})

app.get("/events/virtual",(req,res)=>{
    res.render("virtual")
})

app.get("/aboutUs",(req,res)=>{
    res.render("aboutUs")
})

app.get("/services",(req,res)=>{
    res.render("services")
})

app.get("/classInfo",(req,res)=>{
    res.render("classInfo")
})

app.get('/payment',auth, (req,res)=>{
    res.render('payment');
})

app.get('/blog',(req,res)=>{
    res.render('blog')
})

app.get('/terms',(req,res)=>{
    res.render('terms')
})

app.get('/privacy',(req,res)=>{
    res.render('privacy')
})

app.get("/contactUs",(req,res)=>{
    res.render("contactUs")
})

app.post('/contactUs',async(req,res)=>{
    const name = req.body.name;
    const contact = new contactmodel({
        name:name,
        phone:req.body.phone,
        email:req.body.email,
        message:req.body.message
    })
    const contactSave = await contact.save();
res.send('<script>alert("Thanks four your feedback"); window.location="contactUs";</script>');
})

app.get('/main', (req,res)=>{
    res.render('main')
})

app.get('/signUp',async(req,res)=>{
    try{
        res.status(201).render('signUp');
    }catch(err){
        res.status(404).send(err);
    }
})

app.post('/signUp', async(req,res)=>{
    try{
        const pass = req.body.Password;
        const cpass = req.body.Confirm_Password;
        if(pass === cpass){
            const register = new registerModel({
                First_Name:req.body.First_Name,
                Last_Name:req.body.Last_Name,
                Email:req.body.Email,
                Phone:req.body.Phone,
                Password:pass,
                Confirm_Password:cpass
            })

            /*const token = await register.generateAuthToken();

            res.cookie("jwt", token,{
                httpOnly:true
            });*/

            const registered = await register.save();
        }else{
            res.status(404).send('<body style="background-color:rgb(231, 127, 127); color:aliceblue; margin:15%;"> <h1 >You entered different Password <br>Go Back &,<br>Please enter both Password same.</h1></body>');
        }
        res.render('signIn');
    }catch(err){
        res.status(404).send(err)
    }
})



app.get('/signIn', (req,res)=>{
    res.render('signIn');
})

app.post('/signIn', async(req,res)=>{
    try{
        const email = req.body.Email;
        const password = req.body.Password;
        const useremail = await registerModel.findOne({Email:email});
        const isMatch = await bcrypt.compare(password, useremail.Password);

        const token = await useremail.generateAuthToken();

        res.cookie("jwt", token,{
            httpOnly:true
        });

        if(isMatch){
            res.status(201).render('home');
        }else{
            res.status(404).send('<body style="background-color:rgb(231, 127, 127); color:aliceblue; margin:15%;"> <h1 >You entered Invalid Password <br>Go Back &,<br>Please enter a valid Password.</h1></body>')
        }
    }catch(err){
        res.status(404).send('<body style="background-color:rgb(231, 127, 127); color:aliceblue; margin:15%;"> <h1 >This email is not registered <br>Go Back,<br> Register first then try to login again.</h1></body>');
    }
})





app.listen(PORT, ()=>{
    console.log(`This server running on http://localhost:${PORT}`);
})