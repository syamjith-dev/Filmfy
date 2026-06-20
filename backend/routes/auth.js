const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/user");
const sendOTP = require("../utils/sendOTP");

//sign-up route
router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    console.log("Signup Request:", email);

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("Generated OTP:", otp);

    await user.save();

    console.log("User Saved");

    await sendOTP(email, otp);

    console.log("OTP sent to:", email);

    res.status(201).json({
      success: true,
      message: "OTP sent to email"
    });

  }
  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});

router.post("/verify-otp", async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    if (user.otpExpiry < Date.now()) {

      return res.status(400).json({
        message: "OTP expired"
      });

    }

    if (user.otp !== otp) {

      return res.status(400).json({
        message: "Invalid OTP"
      });

    }

    user.isVerified = true;

    user.otp = null;

    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



// LOGIN
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  if (!user.isVerified) {
    return res.status(400).json({
      message: "Please verify your email first"
    });
  }

  // password check here

});
module.exports = router;