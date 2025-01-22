import multer from "multer";
import os from "node:os"


const storage = multer.diskStorage({
destination : function (req , file , cb) {
const tempDirectory = os.tmpdir();
cb(null, tempDirectory)
},
filename : function (req ,file , cb) {
    cb(null , `${Math.floor(Math.random()*999)}_${file.originalname}`)
    
}
})


export const upload = multer({storage})