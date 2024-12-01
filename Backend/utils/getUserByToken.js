const getUserByToken = async(token) =>{
    if(!token){
        return{
            message:"token expired",
            logout:true,
        };
    }else{
        const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decodeData.id);
        return user;
    }
};

module.exports = getUserByToken;