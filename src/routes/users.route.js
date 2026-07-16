import {Router} from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, changePassword, getCurrentUser } from "../controllers/users.controller.js";
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

export default userRouter