//require("dotenv").config({path: "./.env"});
import dotenv from "dotenv";

import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

//third way to connect to database is using .then()


//asyncronous method on completion returns a promise so we can add .then() and .catch() to it
connectDB()
.then(()=> {

    app.on("error", (error) => {
            console.log("Server error:", error);
            throw error;
        });
        
    app.listen(process.env.PORT|| 4000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("MpngoDB connection failed error:", error);
})










//one way to connect to database
//function connectDB(){}
//connectDB()


//second way to connect to database is using iffe 

/*
import express from "express";
const app = express();

;(async () => {
    try {
        await mongoose.connect('${process.env.MONGODB_URL}/${DB_NAME}');
        console.log("Connected to MongoDB");


        // If the app is not able to talk to the database, it will not start the server
        app.on("error", (error) => {
            console.log("Server error:", error);
            throw error;
        });


        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }

})();

*/
