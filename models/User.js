const mongoose = require("mongoose")
const addressSchema=require("./Address")
const academicSchema=require("./Academic")

const UserSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    dob:Date,
    gender:{
        type:String,
        enum:['Male','Female','Others']
    },
    mobileNo:String,
    guardianMobileNo:String,
    address:addressSchema,
    academics:academicSchema,
    isVerified:{
        type:Boolean,
        default:false
    }

})


const User=mongoose.models.User || mongoose.model('User',UserSchema)

module.exports=User