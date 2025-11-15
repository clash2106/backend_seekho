import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB =async ()=>{
    try {

        //mongoose actually returns us an object so we can store it in a variable if needed
        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        //this will give us the url of hosting databaseserver
        console.log(`\n MONGODB connected  !! DB HOST : ${connectionInstance.connection.host} \n`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        //process.exit() is a Node.js function that immediately stops your program.
        process.exit(1);
    } 
}

export default connectDB;
//we will call this function in index.js to connect to the database