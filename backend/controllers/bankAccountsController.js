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