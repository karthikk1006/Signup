const express = require('express');
const {signUp,sendOTP,verifyOTP}= require("../controllers/signup")
const router = express.Router();


router.route("/signup").post(signUp)
router.route("/sendotp/:phno").post(sendOTP)
router.route("/verifyotp").patch(verifyOTP)

 module.exports = router;
