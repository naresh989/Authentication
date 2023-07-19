//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const mongoose = require("mongoose")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/users');
}
const userSchema = new mongoose.Schema({
    email: String,
    password :String
  });
const User = new mongoose.model("User" , userSchema)


app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/login",(req,res)=>{
    const username =req.body.username;
    const password = req.body.password;

    User.findOne({email:username}).then((user)=>{
        if(user)
        {
            if(user.password === password)
            {
                res.render("secrets")
            }
        }
    }).catch((err)=>{
        console.log(err);
    })
})
app.post("/register" , (req,res)=>{
    const newUser = new User({
        email : req.body.username,
        password :req.body.password
    });
    newUser.save().then(()=>{res.render("secrets")}).catch((err)=>{
        console.log(err);
    })
})


app.listen(3000, ()=>{
  console.log("server succesfully running on port 3000")
})
