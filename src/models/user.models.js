import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        userName:{
            type:String,
            required:true,
            unique: true,
            lowercase:true,
            trim:true,
            //to make an object searchable enable make index true for optimization
            index:true
        },
        email:{
            type:String,
            required:true,
            unique: true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            index:true,
            trim:true,
            
        },
        avatar:{
            type:String, //cloudinary url
            required:true,
            
        },
        coverImage:{
            type:String,//cloudinary url

        },
        watchHistory:[{
            type:Schema.Types.ObjectId,
            ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true, "Password is required"]
        },
        refreshToken:{
            type:String,
        }
    },
    {
        timestamps:true
        }
    
);

//do not use arrow fucntion here because we need to use this keyword
//this is a middleware so we have the access to next
userSchema.pre("save", async function(next){
    if(!this.isMModified("password")) return next();
    //we have to add the if condition otherwise every time user(any change) is updated password will be hashed again
    this.password = bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect =async function (password){
    return await  bcrypt.compare(password,this.password);
    //this password is the hashed password stored in db
}


userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            //this._id → the MongoDB ObjectId of that user
            _id :this._id,
            userName:this.userName,
            email:this.email,
            fullName:this.fullName,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }

    )
}


//refresh token contain lesser info than access token
userSchema.methods.generateRefreshToken = function (){
     return jwt.sign(
        {
            //this._id → the MongoDB ObjectId of that user
            _id :this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }

    )
}

export const User = mongoose.model("User",userSchema);