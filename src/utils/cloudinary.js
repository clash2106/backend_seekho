//we will upload it as a middleware to cloudinary and get the url and store it in our database
//we will use the same concept for image , videos, pdf etc so we will save it as a utility function

//we will take the image from the user and upload it to the local server and then from the local server we will upload it to cloudinary
//this is a production level approach because uploading directly from user to cloudinary may fail due to network issues
import { v2 as cloudinary } from "cloudinary";  
import fs from "fs";
//a built-in core module that provides an API for interacting with the file system

cloudinary.config({ 
        cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
        api_key: 'process.env.CLOUDINARY_API_KEY', 
        api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary =async (localFilePath)=>{
        try{
                if(!localFilePath)return null;
                //upload the file on clodinary
                const response= await cloudinary.uploader.upload(localFilePath,{
                        resource_type:"auto"
                })
                //file is uploaded successfully
                console.log("file is uploaded on cloudinary",response.url);
                conolse.log(response);
                response.error;
                return response;
        }
        catch(error){
                fs.unlinkSync(localFilePath) //remove method used to delete a file from your local system when the operation got failed
                return null;
        }
}



export {uploadOnCloudinary}


/*we have to make 2-3 functions
1. one for uploading the file
2. one After upload, you MUST delete the local file which has been saved in teh local by the multer
*/