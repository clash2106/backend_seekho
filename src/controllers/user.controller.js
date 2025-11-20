import {asyncHandler} from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res)=>{
    
    //1. get the user detail from the frontend
    const {fullName ,email,userName ,password}=req.body
    console.log("email:",email);
    //it will work only if you send all the field in the body
    
    
    
    // 2.A validation - not empty 
    if(
        [fullName ,email ,userName ,password].some((field)=> field?.trim()===""
    //we use the question mark for optimal chaining
    //We use it to avoid errors when accessing properties of a variable that might be null or undefined. 
    )
    ){
        throw new ApiError(400 ,"All fields are required")
    }or// if(fullName ===""){
    //     throw new ApiError(400 ,"fullname is required")
    // }

    
    

    //2.B validation for the email
    const isValidEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
    if (!email || !isValidEmail(email)) {
    throw new ApiError("Please enter a valid email");
    }





    //3. existed user check
    const existedUser =User.findOne({
        //this User willa automatically call the mongodb by itself
        $or: [{userName},{email}]
    })
    if(existedUser){
        throw new ApiError(409 ,"User wuth that email or Username already exists")
    }

    //4.  check for images and avatar localPath because of required field
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //avatar is the name that we give in the routes
    //always add optional chaining because it can throw an error also
    //we get  the access of .files from the multer  and the middleware generally add more property tp request
    //example the multermiddleware add a filepath
    const coverImageLocalPath =req.file?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }


    // 5. upload them to cloudinary  ,check again on the  avatar on cloudinary because it is a required field
    const avatar =await uploadOnCloudinary(avatarLocalPath)
    const coverImage  =await uploadOnCloudinary(coverImageLocalPath)
    //this step takes time so use await
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }



    //6.create user object -create entry in db 
    const user =await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName:userName.toLowerCase()
    })


    //8. check for user creation
    //7. remove password and refresh token fied from response
    const createdUser =await User.findById(user._id ).select(
        "-password  -refreshToken"
    )//.select has a wierd syntax of kya nhi chahiye
    if(createdUser){
        throw new ApiError(500,"Something Went wrong while registering the user")
    }



    //9. return res
    return res.status(201).json(
        new ApiResponse(200,createdUser ,"User registered")
    )
    //return the status code 2 different in above is generally is a great approach



    
    /*
    steps to register a user 
    1. get the user detail from the frontend
    2. validation - not empty 
    3. check if user is already exists :username and email
    4. check for images and avatar because of required field)
    Make sure the image is valid (size, file type).
    5. upload them to cloudinary ,avatar
    6. create user object -create entry in db
    7. remove password and refresh token fied from response
    The correct secure place is an HTTP-Only Cookie
    8. check for user creation 
    9. return res

    */ 
})

export {registerUser}