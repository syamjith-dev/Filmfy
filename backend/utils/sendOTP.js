const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
  try {

    console.log("OTP Generated:", otp);

    await resend.emails.send({
      from: "Filmfy <onboarding@resend.dev>",
      to: email,
      subject: "Verify your Filmfy Account",
      html: `
              <!DOCTYPE html>
              <html>
              <head>
              <meta charset="UTF-8">
              <title>Filmfy Email Verification</title>
              </head>
              
              <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
              
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
              <tr>
              <td align="center">
              
              <table width="600" cellpadding="0" cellspacing="0"
              style="background:#ffffff;border-radius:10px;padding:40px;box-shadow:0 2px 10px rgba(0,0,0,.08);">
              
              <tr>
              <td align="center">
              
              <h1 style="margin:0;color:#111;font-size:34px;">
              🎬 Filmfy
              </h1>
              
              <p style="font-size:26px;color:#222;margin-top:30px;">
              Verify your email
              </p>
              
              <p style="font-size:16px;color:#555;line-height:28px;">
              Welcome to <b>Filmfy</b>.<br>
              Use the verification code below to complete your registration.
              </p>
              
              <table cellpadding="0" cellspacing="0"
              style="margin:35px auto;background:#111;border-radius:8px;">
              <tr>
              <td style="
              padding:18px 40px;
              font-size:38px;
              font-weight:bold;
              letter-spacing:12px;
              color:#ffffff;
              text-align:center;">
              ${otp}
              </td>
              </tr>
              </table>
              
              <p style="color:#666;font-size:15px;">
              This verification code is valid for
              <b>1 minute</b>.
              </p>
              
              <p style="margin-top:35px;color:#999;font-size:14px;line-height:24px;">
              If you didn't create a Filmfy account, you can safely ignore this email.
              </p>
              
              <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">
              
              <p style="font-size:13px;color:#999;">
              © ${new Date().getFullYear()} Filmfy<br>
              Movie Streaming Platform
              </p>
              
              </td>
              </tr>
              
              </table>
              
              </td>
              </tr>
              </table>

         </body>
        </html>`,
    });


    console.log("Email Sent:", response);

    return response;
  } catch (err) {
    console.error("Email Error:", err);
    throw err;
  }
};

module.exports = sendOTP;