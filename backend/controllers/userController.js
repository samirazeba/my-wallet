const userModel = require('../models/userModel');
const validateRegistrationInput = require('../contracts/registrationValidations');
const savingGoalModel = require('../models/savingGoalModel');
const emailVerificationsModel = require('../models/emailVerificationsModel');
const {
  sendPasswordResetEmail,
  sendVerificationEmail,
} = require("../utils/email");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number } = req.body;

    // Validate input as before (reuse your validation logic)
    const existingUsers = await userModel.getAllUsers();
    const { valid, errors } = await validateRegistrationInput(
      { first_name, last_name, email, password, phone_number },
      existingUsers
    );
    if (!valid) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // Hash password for storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare payload
    const payload = JSON.stringify({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    });

    // Generate code and expiration
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Store in email_verifications (no userId yet)
    await emailVerificationsModel.createEmailVerification(
      null, // userId is null
      email,
      code,
      expiresAt,
      payload
    );

    // Send verification email
    await sendVerificationEmail(email, first_name, code);

    res.status(201).json({
      message:
        "Verification code sent to your email. Please verify to complete registration.",
      email,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    await savingGoalModel.expireOldSavingGoals();

    const token = jwt.sign (
      {id: user.id, email: user.email},
      process.env.JWT_SECRET || "defaultsecret",
      {expiresIn: "168h"}// 7days
    );

    // 3. Return success response with basic user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserFullName = async (req, res) => {
  try {
    const userId = req.params.user_id; // Assuming user_id is passed as a URL parameter
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const fullName = await userModel.getUsersFullName(userId);
    if (fullName) {
      res.json({fullName: fullName});
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    console.error("Error fetching user's full name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.user_id; // Assuming user_id is passed as a URL parameter
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await userModel.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//////////////////////// Forgot Password //////////////////////////

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    }

    // Validate email format using your registration validation
    const { valid, errors } = await validateRegistrationInput(
      {
        first_name: "tmp",
        last_name: "tmp",
        email,
        password: "Tmp123456",
        phone_number: "+38761111111",
      },
      []
    );
    if (!valid && errors.email) {
      return res.status(400).json({ status: "error", message: errors.email });
    }

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      // For security, respond with success even if user not found
      return res.json({
        status: "success",
        message: "If this email exists, a password reset link has been sent.",
      });
    }

    // Generate and send reset token
    const token = await userModel.createPasswordResetToken(user.id);
    const sent = await sendPasswordResetEmail(
      user.email,
      user.first_name,
      token
    );

    if (sent) {
      res.json({
        status: "success",
        message: "If this email exists, a password reset link has been sent.",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Failed to send email.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { new_password } = req.body;

    if (!token || !new_password) {
      return res.status(400).json({
        status: "error",
        message: "Token and new password required.",
      });
    }

    // Add password validation here
    const { valid, errors } = await validateRegistrationInput(
      {
        first_name: "tmp",
        last_name: "tmp",
        email: "tmp@tmp.com",
        password: new_password,
        phone_number: "+38761111111",
      },
      []
    );
    if (!valid && errors.password) {
      return res
        .status(400)
        .json({ status: "error", message: errors.password });
    }

    const reset = await userModel.validatePasswordResetToken(token);
    if (!reset) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired token.",
      });
    }

    const user = await userModel.getUserById(reset.user_id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await userModel.updatePasswordById(user.id, hashedPassword);

    // Mark token as used
    await userModel.markTokenUsed(reset.id);

    // Clear reset attempts
    await userModel.clearResetAttempts(user.id);

    res.json({
      status: "success",
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};