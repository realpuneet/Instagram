require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
require("./src/services/cache.service");




connectDB()
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})