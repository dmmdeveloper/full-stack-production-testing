import { Router } from "express";
import { getUser, Register } from "../controllers/register.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.route("/register").post(upload.fields([{name :"avatar" , maxCount :1}]), Register)
userRouter.route("/profile").get( authenticate,  getUser)
export default userRouter;