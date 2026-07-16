import {v2 as cloudinary} from "cloudinary";
import { ApiError } from "./ApiError.js";

const extractPublicIdFromUrl = (url) => {
  // Split by slashes and isolate the file name with extension
  const parts = url.split('/');
  const fileWithExtension = parts.pop(); 
  
  // Extract folder paths if present after the 'upload/vXXXXXX/' part
  const uploadIndex = parts.indexOf('upload');
  
  // If a version tag exists (e.g., v1234567), skip it
  const beginIndex = parts[uploadIndex + 1].startsWith('v') ? uploadIndex + 2 : uploadIndex + 1;
  
  const folders = parts.slice(beginIndex).join('/');
  const publicIdWithoutExt = fileWithExtension.split('.')[0];
  
  return folders ? `${folders}/${publicIdWithoutExt}` : publicIdWithoutExt;
};

const deleteCloudinaryFile = async(url)=>{
    const publicId = extractPublicIdFromUrl(url);
    try {
        const returnedValue = await cloudinary.uploader.destroy(publicId, {resource_type: 'auto'});
        console.log(returnedValue);
    } catch (error) {
        throw new ApiError(500, "Error while deleting the older version of updated file on cloudinary")
    }
    
}

export {deleteCloudinaryFile};