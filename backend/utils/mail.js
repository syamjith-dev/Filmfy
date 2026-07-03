const nodemailer = require("nodemailer");

console.log("USER:", process.env.BREVO_USER);
console.log("PASS exists:", !!process.env.BREVO_SMTP_KEY);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

module.exports = transporter;