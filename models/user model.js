
const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
firstname:String,
lastname:String,
email:String,
role:{
    type:String,
    eunm:['admin','user'],
    default:"user"
},
password:String,
position:String
})
module.exports=mongoose.model('users',userSchema)
