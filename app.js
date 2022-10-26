const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userdataDB", {useNewUrlParser: true});

const userdataSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User_Credentials = mongoose.model('user_credential', userdataSchema);

app.get("/", function(req, res){
  res.render("home")
});

app.get("/about", function(req, res){
  res.render("about")
});

app.get("/login", function(req, res){
  res.render("login")
});

app.post("/login", function(req, res){
  User_Credentials.findOne({email: req.body.email}, function(err, found_email){
    console.log(found_email);
    if(!err){
      if(found_email){
        if(found_email.password === req.body.password){
          res.render("bird_nest")
        }
        else{
          res.render("login");
        }
      }
      else{
        res.render("login");
      }
    }
    else{
      console.log(err)
    }
  })
});

app.get("/signup", function(req, res){
  res.render("signup")
});


app.get("/birdsnest", function(req, res){
  res.render("bird_nest")
});

app.post("/signup", function(req, res){
  const new_user = new User_Credentials({
    username:  req.body.signup_username,
    email:  req.body.signup_email,
    password: req.body.signup_password
  })
  new_user.save(function(err){
    if (!err){
      res.send("success")
    }
  });
});





app.listen(3000, function(){
  console.log("Server started on port 3000")
});
