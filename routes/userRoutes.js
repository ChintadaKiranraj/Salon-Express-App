const express=require("express")
const userRoute=express.Router()
const userContrller=require("../controllers/usersController")
const UserModel=require("../models/User")

userRoute.post("/create",userContrller.createUser)
userRoute.get("/get",userContrller.getUsers)
userRoute.get("/get/user/:id",userContrller.getUser)
module.exports=userRoute