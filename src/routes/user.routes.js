import { Router } from "express";
import { Register } from "../controllers/register.controller.js";
import { upload } from "../middlewares/upload.middleware.js";


const userRouter = Router();

userRouter.route("/register").post(upload.fields([{name :"avatar" , maxCount :1}]), Register)

export default userRouter;