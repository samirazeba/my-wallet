const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationEmail = async (email, name, code) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Verify your email - My Wallet",
    text: `Your verification code is: ${code}\n\nThis code expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello ${name},</h2>
        <p>Thank you for registering with My Wallet.</p>
        <p>Your verification code is:</p>
        <div style="margin: 20px 0; text-align: center;">
          <span style="background-color: #f3f4f6; padding: 10px 20px; font-size: 24px; font-family: monospace; letter-spacing: 3px; border-radius: 4px;">
            <strong>${code}</strong>
          </span>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};