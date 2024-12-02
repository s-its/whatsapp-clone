const {Schema, model} = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
        select: false,
      },
      profilePic: {
        type: String,
        default: "",
      }
    },
    {
      timestamps: true
    })

userSchema.methods.getJWTtoken = function () {
  return jwt.sign({id: this._id, name: this.name, email: this.email}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = model("User", userSchema);
