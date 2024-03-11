const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    HouseNoandStreet:String,
    city: String,
    state:String,
    pinCode:String,
    referralCode:String
});

module.exports = addressSchema;