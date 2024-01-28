const mongoose = require("mongoose");

const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true });
        console.log("MongoDB Connected Successfully");
    }catch(error){
        console.log(`Error Connecting to MongoDB: ${error.message}`);
    }
}

module.exports = connectDatabase;