const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const getUserByToken = async (token) => {
    if (!token) {
        return {
            message: "Token not provided",
            logout: true,
        };
    }

    try {
        const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(decodeData.id);

        if (!user) {
            return {
                message: "User not found",
                logout: true,
            };
        }

        return user;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return {
                message: "Token expired",
                logout: true,
            };
        } else if (err.name === "JsonWebTokenError") {
            return {
                message: "Invalid token",
                logout: true,
            };
        }

        // Catch-all for unexpected errors
        return {
            message: "Authentication failed",
            logout: true,
        };
    }
};

module.exports = getUserByToken;
