import { verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema = new mongoose.Schema({
   username:{
    type:String,
    required:[true,"Please provide a username"],
    unique :true
   },
   email:{
    type :String,
    required :[true,"Please provide a email"],
    unique:true
   },
   password:{
    type:String,
    required:[true,"Please provide an password"],
    unique:true,
   },
   isVerified:{
     type:Boolean,
     default:false,
   },
   isAdmin:{
    type:Boolean,
    default:false,
   },
   forgetPasswordToken:String,
   forgetPasswordTokenExpiry:Date,
   verifyToken :String,
   verifyTokenExpiry:Date,




})

const User =mongoose.models.users ||mongoose.model("Users",userSchema)
export default User;