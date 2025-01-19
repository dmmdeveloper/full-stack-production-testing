import { APIREsponse } from "../utils/apiresponse.util.js";
import { asyncHandler } from "../utils/asynhandler.utils.js";


const Register = asyncHandler( async ( req , res ) =>{
    console.log(req.url);


    res
    .status(200)
    .json(
        new APIREsponse("User Registered Success Fully !!" , {} , 200)
    )
    
}  )


export { Register}