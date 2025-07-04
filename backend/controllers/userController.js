const userModel = require('../models/userModel');
const validateRegistrationInput = require('../contracts/registrationValidations');
const savingGoalModel = require('../models/savingGoalModel');
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

exports.register = async(req, res) => {
  try {
    // Extract user data from request body
    const {first_name, last_name,  email, phone_number, password} = req.body;

    // GetAllUsers to check for existing users
    const existingUsers = await userModel.getAllUsers();

    // Validate user input
    const {valid, errors} = await validateRegistrationInput({first_name, last_name,  email, phone_number, password}, existingUsers);

    if (!valid) {
      return res.status(400).json({errors});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Register user
    const result = await userModel.register(first_name, last_name,  email, phone_number, hashedPassword);

    res.status(201).json({message: "User registered successfully", userId: result.insertId});
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await userModel.findUserByEmail(email);

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