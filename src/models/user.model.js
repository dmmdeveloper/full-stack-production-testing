import mongoose from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// name - married : boolean - dob - contact -


const userSchema = new mongoose.Schema({

    
    name:{
        type:String,
        trim:true, 
        uppercase:true,
        required:true,
    }, 
    age : {
        type:Number,
        min : 0,
    },
    isAdmin : {
        type : Boolean , 
        default :false
    },
    dob:{
        type :Date ,
        // required :true
    },
    avatar: {
        type : String,
    },
    hobbies : {
        type :[String],
    },
    watchHistry : [
        {
            type :String, 
        }
    ],
    token : {
     type : String   
    }, 
    friend :{
        type  : mongoose.Schema.Types.ObjectId ,
        ref:"User",
    },
    address :{
        street :{
            type :String,
        },
        city :{
            type :String,
        },
        postalcode :{
            type :Number
        }
    },
    role :{
        type :String , 
        enum : ["user" , "admin"],
        default : "user"
    },
    settings :{
        
        type:Map ,
        of:String,

        // settings:{
        //  theme : "Dark", 
        // lang : "en" ,
        // notifications : "enabled"
    // }
    },
    metadata :{
        type :String ,
        of: mongoose.Schema.Types.Mixed
        // metadata: {
        // logincount : 5 ,
        // lastloginIp : "127.9.0.7"
        // tags :[ "new-user",newsletter-subscriber]
        //}
    },
    password: String ,
    email :{
        type: String ,
        // unique: true
        // required :true
    }

} , { timestamps : true})

// hash the password 
userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10)    
    next();
});
// create a method for comparing 
userSchema.methods.isPasswordCorrect = async function (password) {
return await bcrypt.compare( password ,this.password);
}

// create  a meethod which generate the jwt token


userSchema.methods.generateToken = function () {
return jwt.sign( 
    { _id : this._id },
      process.env.TOKENsECRET, 
      {
        expiresIn : "10d"
      }

)

};

export const User = mongoose.model("User" , userSchema);