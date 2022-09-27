const express = require('express')
const User = require("./models/User.js");
const Blog = require("./models/Blog");
const res = require('express/lib/response.js');
const app = express.Router();

app.get('/:id',async function(req,res){
     let result;
     try{
      result =  await User.find({ _id: req.params.id });
     res.send(result[0]);
     }
     catch(error){
         res.send({error : "blog not found"});
     }
     // res.end();
});

app.post('/add',async function(req,res){
   const blog = new Blog({...req.body,date : new Date()});
   try{
   await blog.save();
   res.send({status:"ok"});
   }
   catch(error){
   res.send("data is not added");}
});

app.put("/like/:addOrNot/:id",async function(req,res){
     const user = await Blog.findOne({_id: req.params.id },{_id:true,likes:true});
     if(user)
     {  try{
          let like = user.likes;
          console.log(user);
          if(req.params.addOrNot == "true"){
          like = like + 1;}
          else{
           like = like-1;
          }
          Blog.findByIdAndUpdate(user._id,{likes:like},function()
          {
               res.send({msg:"like operation done"});
          });
         
          }
          catch(error){
               res.send(error);
          }
     }
     else{
     res.send({error:"Provide Valid User Id"});
     }
});

app.put("/comment/:id",async function(req,res){
     const user = await Blog.findOne({_id: req.params.id },{_id:true,comments:true});
     if(user)
     {  try{
          let like = user.likes;
          comment = user.comments.add({author_id : "ksdfjlk",comment:"adsds"});
          like = like + 5;
          Blog.findByIdAndUpdate(user._id,{comments : comment },function(value)
          {    
               
               res.send("jklsf");
          });
         
          }
          catch(error){
               res.send(error);
          }
     }
     else{
     res.send({error:"Provide Valid User Id"});
     }
});
module.exports = app;