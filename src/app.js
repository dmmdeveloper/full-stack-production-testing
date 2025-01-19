import express from "express";
import cors from "cors"
import cookieParser  from "cookie-parser";

const app =express();
// App Configuration 
app.use(express.urlencoded({limit:"2000kb" , extended : true}));
app.use(express.json({limit:"50000kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());


// Default Route 
app.get("/" , (req , res)=>{
    res
    .send(`<h1> Hello World Bro.</h1>`)
});



// Routes Importing
import userRouter from "./routes/user.routes.js";

// Routes Declaration
app.use("/user" , userRouter)








export default app

