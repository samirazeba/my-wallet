const userModel = require('../models/userModel');
const validateRegistrationInput = require('../contracts/registrationValidations');
const bcrypt = require('bcrypt');

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
    const {first_name, last_name,  email, password, phone_number} = req.body;

    // GetAllUsers to check for existing users
    const existingUsers = await userModel.getAllUsers();

    // Validate user input
    const {valid, errors} = await validateRegistrationInput({first_name, last_name, email, password, phone_number}, existingUsers);

    if (!valid) {
      return res.status(400).json({errors});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Register user
    const result = await userModel.register(first_name, last_name, email, hashedPassword, phone_number);

    res.status(201).json({message: "User registered successfully", userId: result.insertId});
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};