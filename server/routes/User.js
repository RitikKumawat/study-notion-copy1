const express = require("express");
const { login, signUp, sendOTP, changePassword } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const router = express.Router();




router.post("/login",login)

router.post("/signup",signUp)

router.post("/sendotp",sendOTP)

router.post("/changepassword",auth,changePassword)


router.post("/reset-password-token",resetPasswordToken)

router.post("/reset-password",resetPassword)

module.exports = router 