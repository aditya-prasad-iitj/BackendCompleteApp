import {v2 as cloudinary} from "cloudinary";
import { log } from "console";

import fs from "fs";

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        // file has been uploaded succefully
        console.log("File has been Uploaded @ Cloudinary, Successfully !", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

// cloudinary.v2.uploader
// .upload("dog.mp4", {
//   resource_type: "video", 
//   public_id: "my_dog",
//   overwrite: true, 
//   notification_url: "https://mysite.example.com/notify_endpoint"})
// .then(result=>console.log(result));