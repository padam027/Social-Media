const mongoose = require('mongoose');


module.exports = async ()=>{
    const mongoUrl = process.env.MONGO_URL;

    try{
    const connect =  await mongoose.connect(mongoUrl,

       {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       }); 

        console.log(`Connecting to MongoDB database: ${connect.connection.host}`.bgMagenta.white)
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}