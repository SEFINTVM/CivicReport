const express=require('express');
const bcrypt=require('bcryptjs');
const cors=require('cors')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const mongo=require('mongoose')
const ConnectDB=require('./Database.js')
const Router=require('./routes/Router.js')
const app=express()

app.use(cors())
app.use(express.json())

ConnectDB();
app.use('/api',Router)

app.listen(4000,()=>{
    console.log('Server running at 4000');
    
})




