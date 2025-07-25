import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required :  true
    },

    imageUrl : {
        type : String,
        required : true,
    },

    clerkId : {
        type : String,
        required :  true,
        unique : true,
    },
}, {timestamps : true });


// this how the user will created in the database 
export const User = mongoose.model("User", userSchema)