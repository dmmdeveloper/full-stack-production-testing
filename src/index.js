import app from "./app.js";
import { DBConnection } from "./db/connect.db.js";
import dotenv from "dotenv"

dotenv.config({path:".env"})

let port = process.env?.PORT || 4001

DBConnection()
.then(()=>{
    // listen the App
    app.listen(port , ()=>{
        console.log(`=> app is listening on http://localhost:${port}`);
        
    })
})
.catch((error)=>{ console.log("Error On App Listening" , port);
});