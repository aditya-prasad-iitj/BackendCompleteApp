import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/users.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const generateAccessAndRefreshTokens = async function(userId){
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the Refresh and Access Tokens")
    }

}

const registerUser = asyncHandler(async (req, res) =>{
    //get user details from frontend
    const {fullName, username, email, password} = req.body;
    // console.log("email: ", email);
    

    // Validation - not empty
    if([fullName, username, email, password].some((field)=>(field?.trim()) === "" || !field)){
        throw new ApiError(400, "All fields are required");
    }


    // check if user already exists: username, email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists.")
    }


    //check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path; // multer hame req.body ke saath saath req.files ka access de deta 

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage[0]){
        coverImageLocalPath = req.files?.coverImage[0]?.path;
    }

    //upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }


    //create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    
    
    //remove password and refrsh token field from the responce
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    
    //check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something Went wrong while Registering the User");
    }


    //return res
    res.status(201).json(new ApiResponse(200,createdUser, "User Registered Successfully")); 

})

const loginUser = asyncHandler(async (req, res) =>{
    //req body -> data
    //username or email compulsory
    //validate is already registered ?
    //find the user
    //password check
    //Access and Refresh Token
    //send cookie

    const {email, username, password} = req.body;

    if(!(email || username)){
        throw new ApiError(400, "Either Email of Username Required");
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user){
        throw new ApiError(404, "User doesn't Exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid Login Credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    res.status(200).cookie("accessToken", accessToken, cookieOptions).cookie("refreshToken", refreshToken, cookieOptions).json(
        new ApiResponse(201, {
            user: loggedInUser,
            accessToken,
            refreshToken,
        }, "User logged In Successfully!!")
    )
})


export {registerUser, loginUser}