import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB =async ()=>{
    try {

        //mongoose actually returns us an object so we can store it in a variable if needed
        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MONGODB connected  !! DB HOST : ${connectionInstance.connection.host} \n`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    } 
}

export default connectDB;
//we will call this function in index.js to connect to the database