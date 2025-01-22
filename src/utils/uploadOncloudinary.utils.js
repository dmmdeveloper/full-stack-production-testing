import {v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"

dotenv.config({path :".env"});

// Cloudianry Configuration
cloudinary.config({
cloud_name  : process.env?.CLOUD_NAME,
api_key : process.env?.CLOUD_API_KEY,
api_secret: process.env?.CLOUD_API_SERET
});


export const uploadOnCloudinary = async (filePath)=>{
try {
if(!filePath) return; 

const response = await cloudinary.uploader.upload(filePath);


return response.url
    
} catch (error) {
    console.log("File Not Uploaded " , error);
    return null;
    
    
}




}