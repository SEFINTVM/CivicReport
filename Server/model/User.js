const mongo=require('mongoose')

const User=new mongo.Schema({
    name:String,
    phone:String,
    email:{type: String, unique: true},
    pass:String,
    role:{type:String,default:'citizen'},
})

module.exports= mongo.model('User',User)