const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const Otp = require("../models/otp.js");

exports.sendOtp = async (req, res) => {

  const { email } = req.body;

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const expiresAt = new Date(Date.now() + 90 * 1000);

  await Otp.findOneAndDelete({ email });

  await Otp.create({
    email,
    otp,
    expiresAt,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Filmfy OTP Verification",
    html: `
      <h2>Filmfy Verification</h2>
      <h3>${otp}</h3>
      <p>OTP expires in 90 seconds.</p>
    `,
  });

  res.status(200).json({
    success: true,
    message: "OTP sent",
  });
};

exports.verifyOtp = async (req, res) => {

  const { email, otp } = req.body;

  const otpDoc = await Otp.findOne({ email });

  if (!otpDoc) {
    return res.status(400).json({
      message: "OTP not found",
    });
  }

  if (new Date() > otpDoc.expiresAt) {
    return res.status(400).json({
      message: "OTP expired",
    });
  }

  if (otpDoc.otp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  await Otp.deleteOne({ email });

  res.status(200).json({
    success: true,
    message: "OTP verified",
  });
};