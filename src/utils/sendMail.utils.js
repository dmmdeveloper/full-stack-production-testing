import nodemailer from "nodemailer";
import dotenv from "dotenv";



dotenv.config({path:".env"})

export const sendMail = async (to, subject , text, html)=>{
try {

    const transporter =  nodemailer.createTransport({
        service:"gmail",
        auth:{
            user :process.env.COMPANYeMAIL,
            pass:process.env.EMAILpASSWORD
        }
    })

    const mailOptions = {
        from :process.env.COMPANYeMAIL, 
        to ,
        subject ,
        text ,
        html
    };

  await transporter.sendMail(mailOptions , (error,info) =>{
console.log("Email Sent To : " ,info.response);
    })

} catch (error) {
    console.log("Email Not Sent To :" , error);
    
    
}




}

