const db = require("../config/db");

exports.getAllTransactions = async (user_id) => {
    const [rows] = await db.query("SELECT * FROM transactions WHERE user_id = ?", [user_id]);
    return rows;
};

exports.getDashboardTransactionData = async (user_id) => {
    const [rows] = await db.query(
        "SELECT t.name, c.name AS category_name, t.created_at, t.amount FROM transactions t JOIN categories c on c.id = t.category_id WHERE t.user_id = ?",
        [user_id]
    );
    return rows;
}

exports.addTransaction = async (user_id, bank_account_id, category_id, name, beneficiary, amount, type, description) => {
    const [rows] = await db.query(
        "INSERT INTO transactions (user_id, bank_account_id, category_id, name, beneficiary, amount, type, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [user_id, bank_account_id, category_id, name, beneficiary, amount, type, description]
    );
    return rows;
};

exports.viewDetailsByTransactionId = async (id) => {
    const [rows] = await db.query (
        "SELECT c.name AS category_name, t.* FROM transactions t JOIN categories c on c.id = t.category_id WHERE t.id = ?",
        [id]
    );
    return rows;
};