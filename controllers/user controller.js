const User=require('../models/user model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.signup=(req,res)=>{
  const data={
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    password: bcrypt.hashSync ( req.body.password ,10),
    position:req.body.position,
  }
  const user=new User(data)
  user.save().then(
    (createdUser)=>{
      res.status(200).json({message:'user added successfully'})
    }
  ).catch(
    (error)=>{
      res.status(400).json({message:"problem when adding user"})
    }
  )
}

exports.signin= async(req,res)=>{
  const{email,password}=req.body;
  const user=await User.findOne({email :email})
  if(!user){
    return res.status(400).json({message : "Email invalid..."})
  }

  bcrypt.compare(password,user.password).then(
    (isMatch)=>{
      if(isMatch==false){
        return res.status(400).json({message:"password invalid...."})
      }else{
        const token=jwt.sign({
          data:{id: user._id , role:user.role}
        }, process.env.CLE,{expiresIn:'1h'})
    
        return res.status(200).json({message:"success password ....", token:token,user:user})
      }
    }
  )
}

    
