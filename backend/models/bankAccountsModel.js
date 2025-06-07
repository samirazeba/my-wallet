const db = require("../config/db");

exports.getAllBankAccounts = async (user_id) => {
  const [rows] = await db.query(
    "SELECT id, bank_name, account_number FROM bank_accounts WHERE user_id = ?",
    [user_id]
  );
  return rows;
};