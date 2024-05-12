const mongoose = require("mongoose")
 const bycrypt= require("bcryptjs")
const userSchema =mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
      },
      email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid emaial",
        ],
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
        
      },
      phone: {
        type: Number,
        required: [true, "Please add a phone number"],
        Length: [10, "number must be of 10 number"],
        default: "9800000000",
      },
      address: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "address",
      },
      isVerified:{
        type:Boolean,
        defult:false
      },
      emailToken:{
        type:String
      }

},{
    timestamp:true
}
);
//encrypting password
userSchema.pre("save",async function(next){
if(!this.isModified("password")){
    return next();

}
 
   //encripting password
   const salt= await  bycrypt.genSalt(10);
   const encriptedpassword =await bycrypt.hash(this.password,salt);
   this.password=encriptedpassword;
   next();
})

const User= mongoose.model("user",userSchema)
module.exports = User