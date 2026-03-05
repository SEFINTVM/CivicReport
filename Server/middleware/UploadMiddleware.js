const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },

    filename:(rea,file,cb)=>{
        const uname=Date.now()+path.extname(file.originalname);
        cb(null,uname)
    }
})

const upload=multer({
    storage:storage,
    limits:{
        files:2
    }
})


module.exports=upload
