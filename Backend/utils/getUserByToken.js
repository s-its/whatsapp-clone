const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const getUserByToken = async(token) =>{
    if(!token){
        return{
            message:"token expired",
            logout:true,
        };
    }else{
        const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY);
        return await UserModel.findById(decodeData.id);
    }
};

module.exports = getUserByToken;