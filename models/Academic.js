const mongoose = require('mongoose');

const acaademicSchema=new mongoose.Schema({
    school:String,
    class:Number,
    board:String,
    subjects:{
        type:String,
        enum: ['English', 'Hindi', 'Biology', 'Chemistry', 'Political Science', 'Computer Science', 'Accountancy', 'Geography', 'Economics', 'Mathematics', 'Physical Education', 'Social Science', 'Business', 'Physics']
    }
})
module.exports=acaademicSchema;