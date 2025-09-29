const mongoose = require("mongoose");

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI).then((res)=>{
            console.log("MongoDb connected successfully!");
        })
    } catch (error) {
        console.log("MongoDb Connection error");
        
    }
}

module.exports = connectDB;