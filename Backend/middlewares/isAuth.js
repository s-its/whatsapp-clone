const UserModel = require("../models/userModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuth =catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    console.log(token, "token");
    if (!token){
        return res.status(400).json({
            message: "Please login to access this resource",
            error: true
        });
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decodeData.id);
    next();
});