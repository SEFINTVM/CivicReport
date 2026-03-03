const mongo=require('mongoose')
require('dotenv').config()

const ConnectDB=async()=>{
    try{
        await mongo.connect(process.env.MONGO_URL)
        console.log('Mongo Connected');
        
    }catch (err) {
        console.error('MongoDB connection failed:', err.message)
    }
}

module.exports = ConnectDB