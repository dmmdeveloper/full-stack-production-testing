import { User } from "../models/user.model.js";
import { APIError } from "../utils/apierror.utils.js";
import { APIREsponse } from "../utils/apiresponse.util.js";
import { asyncHandler } from "../utils/asynhandler.utils.js";
import jwt from "jsonwebtoken"
import chalk from "chalk"


export const authenticate = asyncHandler( async( req ,res , next)=>{
try {
    
const token  = req.cookies?.Token;

if(!token){
    res
    .status(404)
    .json(
        new APIREsponse("Invalid Token" , null , 404)
    )
    throw new APIError("Invalid Token !!" , 404)
}


const decodedToken = jwt.verify(token , process.env?.TOKENsECRET)

const findUser = await User.findById(decodedToken?._id).select("-password");

req.user = findUser
if(req.user){
    console.log(chalk.bgBlue("isAuthenticate Request : "), chalk.green("True") );   
}else{
    console.log(chalk.bgBlue("isAuthenticate_Request : "), chalk.red("false") );   
}

next();
} catch (error) {
    console.log(chalk.bgBlue("isAuthenticate_Request : "), chalk.red("false") );   
    res.status(404)
    .json(
        new APIREsponse("UnAuthorized Request :)" , null, 404 )
    )
    throw new APIError("UnAuthorized Request");
    
}



} )