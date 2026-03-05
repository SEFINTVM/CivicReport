const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const multer=require('multer')
const mongo=require('mongoose')
const OPRouter=express.Router();
const User=require('../model/User.js')
const Report=require('../model/Report.js')
const AuthMiddleware=require('../middleware/AuthMiddleware.js')
const upload=require('../middleware/UploadMiddleware.js')



OPRouter.post('/subForm',upload.array('photos',2),async(req,res)=>{
       try{
            const photos=req.files.map(file=>file.filename)

            const newReport=new Report({
                    fname:req.body.fname,
                    Phone:req.body.Phone,
                    place:req.body.place,
                    address:req.body.address,
                    pin:req.body.pin,
                    pstation:req.body.pstation,
                    problemT:req.body.problemT,
                    problemD:req.body.problemD,
                    photo:photos
            })

            await newReport.save()
            res.status(200).json({message:"Report submitted successfully"});
       }catch(err){
            res.status(500).json({error:err.message});
       }
})

OPRouter.get('/getComplaint',async(req,res)=>{
    try{
            const Comp=await Report.find()
            if(!Comp){
                res.status(404).json({message:'Error in fetching complaints'})
            }
            res.status(200).json(Comp)
            console.log(Comp);
            
    }catch(err){
        res.status(500).json({error:err.message});
    }
})


module.exports=OPRouter