const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server Ready");
  }
});

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Filmfy OTP Verification",
      html: `
        <h2>Welcome to Filmfy</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
      `,
    });

    console.log("OTP Email Sent");
  } catch (error) {
    console.log("Email Error:", error);
  }
};

module.exports = sendOTP;