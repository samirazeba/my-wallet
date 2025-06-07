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