const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: new Date(Date.now() + 60 * 1000),
      isVerified: false
    });

    await user.save();

    // console.log("Generated OTP:", otp);

    await sendOTP(email, otp);

    // console.log("OTP sent to:", email);

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
//verfy-otp
router.post("/verify-otp", async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (new Date() > user.otpExpiry) {
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
    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});
// resend otp
router.post("/resend-otp", async (req, res) => {

  try {

    const { email } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });

    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;

    user.otpExpiry = new Date(
      Date.now() + 90 * 1000
    );

    await user.save();

    await sendOTP(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
//reset-psw
router.post('/update-psw', async (req, res) => {

  try {

    const { email, newPassword, confirmPassword } = req.body;

    //compare password
    if (newPassword === confirmPassword) {
      const hashedPassword =
        await bcrypt.hash(newPassword, 10);

      await User.updateOne(
        { email: email },
        {
          $set: {
            password: hashedPassword
          }
        }
      );
      return res.status(200).json({
        message: "Updated the password"
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is not match!"
      });
    }



  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;