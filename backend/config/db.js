const mongoose = require("mongoose");
require("dotenv").config()


const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.DB_API)
        console.log(`DB connect ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.log("DB problem")
        process.exit(1)
    }
}

module.exports = connectDB 
