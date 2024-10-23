import cookieParser from 'cookie-parser';
import express from 'express'
import path from 'path'
import userModel from './models/user.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
let app = express();

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser());
app.get('/',(req,res) => {
  res.render("index");
})
app.post('/create', (req,res) => {
  let {username,email,password,age} = req.body;
  bcrypt.genSalt(10, (err,salt) =>{
    bcrypt.hash(password,salt,async(err,hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        password : hash,
        age,
      })
      let token = jwt.sign({email},'secret');
      res.cookie("token",token);
      res.send(createdUser);
    })
  })
  
})
app.get("/logout",(req,res) => {
  res.cookie("token",'');
  res.redirect('/');
})
app.listen(3000,() => {
  console.log('http://localhost:3000');
})