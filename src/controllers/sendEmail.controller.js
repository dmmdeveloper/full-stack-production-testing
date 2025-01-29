import { APIREsponse } from "../utils/apiresponse.util.js";
import { asyncHandler } from "../utils/asynhandler.utils.js";
import nodemailer from "nodemailer"

const sendEmailTest = asyncHandler(  async (req , res)=>{
console.log(req.url);

// get Data 
// create a utility function which give the data in params :- from(user) , subject , text , html , 
// Credentials in utility function
// send Response
const { name , email , subject , text , html}  =req.body;

console.log(name ,email  , subject , text , html);

await sendMail(email , name,subject , text , `<h1>${html}</h1>`)

res.status(200)
.json(
    new APIREsponse("Email Message Sended Success Fully !!", {} , 200)
)
});

const sendMail = async (user, name, subject , text  ,html)=>{

try {
        const transporter = nodemailer.createTransport({
            service :"gmail",
            auth :{
            user :process.env.COMPANYeMAIL,
            pass :process.env.EMAILpASSWORD  // Gamil App Password       
         }
        })
    
     await   transporter.sendMail( { 

            from : `"<${name}>" <${user}>` ,
            to : process.env.COMPANYeMAIL, 
            subject ,
            text, 
            html,
            replyTo:user, 

        } , (_  , info) =>{
    console.log("Email Sent To Success Fully !!:");
        })

} catch (error) {
       console.error("Emil NOT Sent :"  ,error);
}

} 

export default sendEmailTest; 