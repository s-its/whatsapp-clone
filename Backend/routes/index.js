const express = require("express");
const {
  registerUser,
  login,
  logout,
  userDetails,
  updateUser,
  searchUser,
  sample,
} = require("../controllers/userController");
const { isAuth } = require("../middlewares/isAuth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/userDetails").get(isAuth,userDetails);
router.route("/updateUser").put(updateUser);
router.route("/searchUser").post(searchUser);
router.route("/sample").post(sample);

module.exports = router;