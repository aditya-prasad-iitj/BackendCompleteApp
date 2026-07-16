import {Router} from "express";
import { registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory } from "../controllers/users.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";




const userRouter = Router()

userRouter.route("/register").post(
    upload.fields([
        {
            name: "avatar", // same as frontend field
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(verifyJWT, logoutUser)

userRouter.route("/refreshAccessToken").post(verifyJWT, refreshAccessToken)

userRouter.route("/changePassword").post(verifyJWT, changePassword)

userRouter.route("/getCurrentUser").post(verifyJWT, getCurrentUser)

userRouter.route("/updateAccountDetails").patch(verifyJWT, updateAccountDetails)

userRouter.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

userRouter.route("/coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

userRouter.route("/c/:username").get(verifyJWT, getUserChannelProfile)

userRouter.route("/history").get(verifyJWT, getWatchHistory)

export default userRouter