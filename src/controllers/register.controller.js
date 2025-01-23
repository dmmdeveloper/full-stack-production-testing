import { User } from "../models/user.model.js";
import { APIError } from "../utils/apierror.utils.js";
import { APIREsponse, Response } from "../utils/apiresponse.util.js";
import { asyncHandler } from "../utils/asynhandler.utils.js";
import { sendMail } from "../utils/sendMail.utils.js";
import { uploadOnCloudinary } from "../utils/uploadOncloudinary.utils.js";


const generateToken = async (_id) =>{
    try {

        const findUser = await User.findById(_id);
        const token = await findUser.generateToken();
        findUser.token = token;
        await findUser.save({validateBeforeSave:false});

    return token       
    } catch (error) {
        Response(res , "Error When Token Generating", {} , 404)
        throw new APIError("Error When Token Generating", 404 )
    }
}

const Register = asyncHandler( async (req,res) =>{    

    console.log(req.url);

    // get Data
    // validate for requiredFields 
    // findUser 
    // upload files on cloudinary and get URL
    // create object
    // findById and remove select("-filed")  unnessery fields
    // sendEmailS
    // return res cookies & josn

const { name , age , isAdmin , dob , hobbies , freind , street,city, postalcode,  role , settings,  metadata , password , email } = req.body;

const requiredFields = ["name", "email", "password"];
for(let field of requiredFields){

if(!req.body[field]){
    // Response( res, `${field} is Required :)` ,null, 404 ) X 
    res
    .status(404).json(
        new APIREsponse(`${field} is Required :)` , {} , 404)
    );
    throw new APIError(`${field} is Required :)` ,402 )
}
}
// const findUser = await User.findOne({
//     $and :[{name},{email}]
// });

// if(findUser){
//     Response(res,"User Already Registered :)", {} , 402);  
//     throw new APIError("Email Already Registered :))!" , 402);
// }


let avatar ;
if(req.files?.avatar){
 avatar = req.files?.avatar[0]?.path 
}
console.log(avatar);

const avatarURL = await uploadOnCloudinary(avatar);
console.log(avatarURL);

const providedFields = { name , email , password  }
if(age) providedFields.age = age;
if(isAdmin)providedFields.isAdmin = isAdmin === "true"?true : false
if(dob) providedFields.dob = new Date(dob);
if(hobbies) providedFields.hobbies = JSON.parse(hobbies);
if(freind) providedFields.freind = freind;
if(street || city || postalcode) providedFields.address = { street , city, postalcode };
if(role) providedFields.role = role;
if(avatar)  providedFields.avatar = avatarURL;
// if(settings) providedFields.settings  =JSON.stringify(settings);  // send here object
// if(metadata) providedFields.metadata = JSON.stringify(metadata); // upload here object 

console.log(providedFields);
const  createdUser = await User.create({...providedFields});

const token = await generateToken(createdUser?._id);

const RegisteredUser = await User.findById(createdUser?._id).select("-password -email");



if(!RegisteredUser) {
    Response(res , "Error When User Creation !!" , {} , 201)
    throw new APIError("Error When User Creation !!" , 201)
}
// findById and remove select("-filed")  unnessery fields
// sendMail
// return cookie

await sendMail("dostmuhammadmalhoo@gmail.com","Production FullStack Testing !!" , "" , `<h1> Hello Dear </h1>`)

const options = {
    httpOnly : true,
    secure : true,
    sameSite :"none",
}


    return res
    .status(200)
    .cookie("Token",token ,options)
    .json(
        new APIREsponse("User Registered Success Fully !!" , RegisteredUser, 200)
    )    
})


// login the user
// forget change the password
// edit profile 


export { Register}