const express=require('express')
const route= express.Router()
const usercontroller=require("../controllers/user controller")




route.post("/signup", usercontroller.signup)
route.post("/signin", usercontroller.signin)



module.exports=route