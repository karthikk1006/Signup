const User=require("../models/User")
const jwt = require('jsonwebtoken');
require("dotenv").config()


//GLOBAL VARIABLES
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const secretKey=process.env.SECRET_KEY

const client = require('twilio')(accountSid, authToken);


const generateOTP=()=>{
    return Math.floor(1000 + Math.random() * 9000);
}

const signUp=async(req,res)=>{
    try {
        const user=await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg:error})       
    }
}

const sendOTP=async(req,res)=>{
    try {
        const phoneNo = "+91"+req.params.phno; //assuming the phone number is given with area code
        const generatedOTP=generateOTP()
        await client.messages
        .create({
        body: `Your OTP is : ${generatedOTP}`,
        from: '+15136574137',
        to: phoneNo
        })
        .then(message => console.log(message.sid))
        jwt.sign({phoneNo : phoneNo, otp : generatedOTP},secretKey,{ expiresIn: '5m' },(err,token)=>{
            if (err) throw err;
            console.log(token);
            res.cookie('token', token).json({msg:"Sent successfully"})

        })

    } catch (error) {
        res.status(500).json({msg:error})              
    }
}

const verifyOTP=async(req,res)=>{
    try {
        const {enteredOTP}=req.body;
        const  token  = req.cookies["token"];
        const { phoneNo, otp } = jwt.verify(token, secretKey);
        console.log(enteredOTP);
        if(otp==enteredOTP){
            await User.findOneAndUpdate({mobileNo:phoneNo},{isVerified:true})
            res.status(200).json({msg:"Verified Successfully"})
        }
        else{
            res.status(401).json({msg:"Incorrect OTP"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})              
    }
}

module.exports={signUp,
                sendOTP,
                verifyOTP}