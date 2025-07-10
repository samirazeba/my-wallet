const emailVerificationsModel = require("../models/emailVerificationsModel");
const userModel = require("../models/userModel");
const { sendVerificationEmail } = require("../utils/email");
const bcrypt = require("bcrypt");

exports.registerAndSendVerification = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare payload for later user creation
    const payload = JSON.stringify({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    });

    // Generate code and expiry
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save to email_verifications
    await emailVerificationsModel.createEmailVerification(
      null,
      email,
      code,
      expiresAt,
      payload
    );

    // Send email
    await sendVerificationEmail(email, first_name, code);

    res.status(200).json({ message: "Verification code sent." });
  } catch (error) {
    console.error("registerAndSendVerification error:", error); // Add this line
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyEmailCode = async (req, res) => {
  const { email, code } = req.body;
  const record = await emailVerificationsModel.verifyEmailCode(email, code);

  if (!record)
    return res.status(400).json({ message: "Invalid or expired code." });
  if (record.is_verified)
    return res.status(400).json({ message: "Already verified." });
  if (new Date(record.expires_at) < new Date())
    return res.status(400).json({ message: "Code expired." });

  let userData;
  if (typeof record.payload === "string") {
    userData = JSON.parse(record.payload);
  } else {
    return res.status(400).json({ message: "Invalid registration data." });
  }

  // Check if user already exists (should not, but for safety)
  const existingUser = await userModel.findUserByEmail(userData.email);
  let userId;
  if (existingUser) {
    userId = existingUser.id;
  } else {
    // Create user
    const result = await userModel.register(
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.phone_number,
      userData.password
    );
    userId = result.insertId;
  }

  // Mark as verified and set user_id
  await emailVerificationsModel.updateEmailVerification(record.id, {
    is_verified: 1,
    user_id: userId,
  });

  res.status(200).json({ message: "Email verified and registration complete." });
};

exports.resendVerificationCode = async (req, res) => {
  const { email } = req.body;
  const record = await emailVerificationsModel.getLatestEmailVerification(email);
  if (!record || record.is_verified) {
    return res.status(400).json({ message: "No pending registration found." });
  }

  let userData;
  if (typeof record.payload === "string") {
    userData = JSON.parse(record.payload);
  } else {
    return res.status(400).json({ message: "Invalid registration data." });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await emailVerificationsModel.resendEmailVerification(
    record.user_id,
    email,
    code,
    expiresAt,
    record.payload
  );
  await sendVerificationEmail(email, userData.first_name, code);

  res.json({ message: "Verification code resent." });
};