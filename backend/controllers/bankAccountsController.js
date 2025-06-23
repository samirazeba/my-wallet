const bankAccountsModel = require("../models/bankAccountsModel");

exports.getAllBankAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const accounts = await bankAccountsModel.getAllBankAccounts(userId);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBankAccountInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user
    const accountInfo = await bankAccountsModel.getBankAccountInfo(userId);
    
    if (accountInfo.length === 0) {
      return res.status(404).json({ message: "Bank account not found" });
    }
    
    res.status(200).json(accountInfo[0]); 
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.addBankAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bank_name, account_number, balance } = req.body;

    if (!bank_name || !account_number || balance === undefined) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newAccountId = await bankAccountsModel.addBankAccount(
      userId,
      bank_name,
      account_number,
      balance
    );

    res.status(201).json({ message: "Bank account added", id: newAccountId });
  } catch (error) {
    console.error("Add Bank Account Error:", error); // <--- Add this line
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.softDeleteBankAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const accountId = req.params.id;
    const success = await bankAccountsModel.softDeleteBankAccount(userId, accountId);
    if (success) {
      res.status(200).json({ message: "Bank account deleted" });
    } else {
      res.status(404).json({ error: "Bank account not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};