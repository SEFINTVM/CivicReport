const express=require('express');
const bcrypt=require('bcryptjs');
const cors=require('cors')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const mongo=require('mongoose')
const ConnectDB=require('./Database.js')
const Router=require('./routes/Router.js')
const OPRouter=require('./routes/OPRouter.js')
const cookieParser=require('cookie-parser')
const app=express()


app.use("/uploads", require("express").static("uploads"));
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

ConnectDB();
app.use('/api',Router)
app.use('/op',OPRouter)

app.listen(4000,()=>{
    console.log('Server running at 4000');
    
})




