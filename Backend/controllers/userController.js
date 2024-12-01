const catchAsyncError = require("../middlewares/catchAsyncErrors");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/sendToken")

exports.registerUser = catchAsyncError(async (req, res) => {
  const {name, email, password, profilePic} = req.body;

  const checkEmail = await UserModel.findOne({email});

  if (checkEmail) {
    return res.status(400).json({
      message: "User already exists",
      error: true,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create(
      {name, email, password: hashPassword, profilePic});
  if (user) {
    return res.status(201).json({
      message: "User created successfully",
      user,
      success: true,
    });
  }
});

exports.login = catchAsyncError(async (req, res) => {
  const {email, password} = req.body;

  const user = await UserModel.findOne({email}).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "User not Found",
      error: true,
    })
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    return res.status(400).json({
      message: "Wrong Password",
      error: true,
    })
  }

  sendToken(user,201, res);

});

// logout
exports.logout = catchAsyncError(async(req,res)=>{
  const cookieOptions = {
    http:true,
    secure:true,
    samesite:"None",
  };
  return res.cookie("token" , "",cookieOptions).status(200).json({
    message:"logout successfully",
    success: true,
  });
});

// user details
exports.userDetails = catchAsyncError(async(req,res)=>{
  const user = req.user;
  return res.status(200).json({
    message:"User details",
    user,
  });
});

// update user

exports.updateUser = catchAsyncError(async(req,res)=>{
  const{userId,name,profilePic} = req.body;
  const updateUser = await UserModel.updateOne(
    {_id: userId},{name,profilePic}
  );
  if(updateUser?.modifiedCount==1){
    const user = await UserModel.findById(userId);
    return res.status(200).json({
      message:"user updated successfully",
      user,
      success:true,
    });
  }else{
    return res.status(400).json({
      message:"user not updated",
      error:true,
    });
  }
});

// 