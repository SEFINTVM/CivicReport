const mongo=require('mongoose')

const Report=new mongo.Schema({
    fname:String,
    Phone:String,
    place:String,
    address:String,
    pin:Number,
    pstation:String,
    problemT:String,
    problemD:String,
    photo:[String],
    createdAT:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongo.model('Report',Report);