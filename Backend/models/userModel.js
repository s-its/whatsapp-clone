const {Schema , model}  = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name:{
    type:String,
    required:true,
    },

    email:{
        type:String,
        required:true,
        unique: true,
        },

    password:{
        type:String,
        required:true,
        select: false,
        },
    profilepic:{
        type:String,
        default: "",
        },
})