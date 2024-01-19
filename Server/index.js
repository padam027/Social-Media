const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config('./.env');
const dbConnect = require('./Config/dbConnect');
const mainRouter = require('./Routers/index');
const morgan = require('morgan');
const cookiParser = require('cookie-parser');
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});




const app = express();

// middleware 
app.use(express.json({limit: "10mb"}));
app.use(morgan('common'));
app.use(cookiParser());

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"

}))

// create Routes
app.use('/api', mainRouter )


//connecting database 
dbConnect();



// connecting port from .env
const PORT= process.env.PORT || 7001;


//coonecting server
app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`.bgBlue)
});