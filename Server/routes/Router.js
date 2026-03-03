const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const multer=require('multer')
const mongo=require('mongoose')
const Router=express.Router();
const User=require('../model/User.js')
const Report=require('../model/Report.js')


Router.post('/register',async(req,res)=>{
        const {name,email,phone,pass,cpass}=req.body
        try{
            if(!name || !email || !phone || !pass || !cpass){
                res.status(400).json({message:'The Required fields are empty '})
            }
            const newUser = new User(req.body)
            await newUser.save()
            res.status(200).json({message:'Data inserted successfully'})
        }catch(err){
                console.error(err);
                res.status(400).json({ error: err.message });  
        }
})

module.exports=Router