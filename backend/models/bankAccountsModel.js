const db = require("../config/db");

exports.getAllBankAccounts = async (user_id) => {
  const [rows] = await db.query(
    "SELECT id, bank_name, account_number, balance FROM bank_accounts WHERE user_id = ? AND is_deleted = 0",
    [user_id]
  );
  return rows;
};

exports.getBankAccountInfo = async (user_id) => {
  const [rows] = await db.query(
    "SELECT ba.*, c.* FROM bank_accounts ba JOIN cards c ON ba.id = c.bank_account_id WHERE ba.user_id = ?",
    [user_id]
  );
  return rows[0];
}

exports.addBankAccount = async (user_id, bank_name, account_number, balance, created_at) => {
  const [result] = await db.query(
    "INSERT INTO bank_accounts (user_id, bank_name, account_number, balance, created_at) VALUES (?, ?, ?, ?, ?)",
    [user_id, bank_name, account_number, balance, created_at || new Date()]
  );
  return result.insertId;
};

exports.softDeleteBankAccount = async (user_id, account_id) => {
  const [result] = await db.query(
    "UPDATE bank_accounts SET is_deleted = 1 WHERE id = ? AND user_id = ?",
    [account_id, user_id]
  );
  return result.affectedRows > 0;
};

exports.updateBankAccountBalance = async (bank_account_id, amount, type) => {
  // type: 'Expense' or 'Income'
  const sign = type === 'Expense' ? -1 : 1;
  const [result] = await db.query(
    "UPDATE bank_accounts SET balance = balance + ? WHERE id = ?",
    [sign * amount, bank_account_id]
  );
  return result.affectedRows > 0;
};
exports.findBankAccountByNumber = async (user_id, account_number) => {
  const [rows] = await db.query(
    `SELECT * FROM bank_accounts WHERE user_id = ? AND account_number = ? AND is_deleted = 0`,
    [user_id, account_number]
  );
  return rows[0] || null;
};

exports.getBankAccountById = async (bank_account_id, user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM bank_accounts WHERE id = ? AND user_id = ? AND is_deleted = 0",
    [bank_account_id, user_id]
  );
  return rows[0];
};

exports.updateBankAccountBalance = async (bank_account_id, amount) => {
  const [result] = await db.query(
    "UPDATE bank_accounts SET balance = balance - ? WHERE id = ?",
    [amount, bank_account_id]
  );
  return result.affectedRows > 0;
};