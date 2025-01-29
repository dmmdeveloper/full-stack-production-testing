import { Router } from "express";
import sendEmailTest from "../controllers/sendEmail.controller.js";
import { upload } from "../middlewares/upload.middleware.js";




const testRoute = Router()

testRoute.route("/email").post (upload.none() ,  sendEmailTest)

export default testRoute;