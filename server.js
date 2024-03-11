const express=require("express")
const mongoose=require("mongoose")
const router=require("./routes/router")
const bodyParser = require('body-parser');
var cookies = require("cookie-parser");
require("dotenv").config()



const app=express()
//GLOBAL VARIABLES
const PORT=process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cookies());


app.use("/",router)


app.listen(PORT,async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
    console.log(`Connected to port ${PORT}`);
});  




