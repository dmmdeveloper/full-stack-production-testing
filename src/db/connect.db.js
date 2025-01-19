import mongoose from "mongoose";
import { dbName } from "../constants.js";
import chalk from "chalk";
// mongoose  
    //  import -> install ==> npm install mongoose 
// we create  a fnx 
    // export   const DBConnection = async ()=> { try {  success  } catch(error){ fail } }
    // mongoose.connect("url/dbname" , opts(optional));
// we highlight the failure and log messages  of DB like loading - success - failed => npm i chakl


export const DBConnection = async ()=>{
    try {
        console.log(chalk.yellow("\t\t\t DataBase Connecting......"));
        const db = await mongoose.connect(`${process.env.DB_URL}/${dbName}`);;; 
        console.log(chalk.bgGreen("** Data Base Connection Success Fully !!"));
        console.log("Host : " , db.connection.host);
        console.log("Name : " , db.connection.name);
    } catch (error) {
        console.log(chalk.bgRed(":) Data Base Connection Failed :))")  , error);
    }
}












