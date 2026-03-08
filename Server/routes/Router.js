const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const multer=require('multer')
const mongo=require('mongoose')
const Router=express.Router();
const User=require('../model/User.js')
const Report=require('../model/Report.js')
const AuthMiddleware=require('../middleware/AuthMiddleware.js')



Router.post('/register',async(req,res)=>{
        const {name,email,phone,pass,cpass}=req.body
        try{
            if(!name || !email || !phone || !pass || !cpass){
                res.status(400).json({message:'The Required fields are empty '})
            }

            if(pass!==cpass){
                res.status(400).json({message:'Password And Confirm Password not matching '})
            }

            const hashedPass=await bcrypt.hash(pass,10)

            const newUser = new User({
                name,
                email,
                phone,
                pass:hashedPass
            })
            await newUser.save()
            res.status(200).json({message:'Data inserted successfully'})
        }catch(err){
                console.error(err);
                res.status(400).json({ error: err.message });  
        }
})

Router.post('/login',async(req,res)=>{
        const {email,pass}=req.body;
        try{
                if(!email || !pass){
                    res.status(401).json({message:'The Required Fields Are Empty'})
                    return
                }

                const findUser= await User.findOne({email:email})
                if(!findUser){
                    res.status(404).json({message:'The User Not Found, Check Mail ID'})
                    return
                }
                const isMatch= await bcrypt.compare(pass,findUser.pass)
                if (!isMatch) {
                    return res.status(401).json({ message: 'Invalid password' });
                }

                const token=jwt.sign({id:findUser._id},process.env.SECRET_KEY,{expiresIn:'1d'})
                res.cookie('token',token,{
                    httpOnly:true,
                    secure:false,
                    sameSite:'strict',
                    maxAge : 24*60*60*1000
                })

                res.status(200).json({message:'User Found'})
        }catch(err){
                console.log(err);
                res.status(400).json({error: err.message})
                
        }
})

Router.get('/profile', AuthMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
});

Router.get('/users',async(req,res)=>{
        try{
            const users=await User.find()
            res.json(users)
        }catch(err){
                console.log(err);
                res.status(404).json({message:'Server Error'})
                
        }
})

Router.post('/logOut',(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({ message: 'Logged out successfully' });
})

module.exports=Router