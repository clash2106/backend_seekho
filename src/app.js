//node modules comes from nodemon installed globally
//ctrl+enter is the shortcut to see multiple features of vs code

import express from "express";
//To prevent unauthorized websites from accessing data from your server.
import cors from "cors";
//THIS FEATURE IS USED SO THAT WE CAN ACCESS COOKIES(eg logged in info) IN USERS BROWSERS
import cookieParser from "cookie-parser";



const app = express();

//app.use() is used for middleware in express.js and configures it
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    
}
));


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true ,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

export default app;