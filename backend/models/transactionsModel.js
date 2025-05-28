const db = require("../config/db");

exports.getAllTransactions = async (user_id, start, end) => {
    let query = "SELECT t.*, c.name AS category_name FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = ?";
    const params = [user_id];

    if (start && end) {
        query += " AND DATE(t.created_at) BETWEEN ? AND ?";
        params.push(start, end);
    }

    const [rows] = await db.query(query, params);
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

exports.getAllExpenses = async (user_id) => {
    const [rows] = await db.query("SELECT t.*, c.name AS category_name FROM transactions t JOIN categories c ON t.category_id = c.id WHERE user_id = ? and t.type = 'Expense'", [user_id]);
    return rows;
};

exports.getUpcomingBills = async (user_id) => {
    const [rows] = await db.query(
        "SELECT a.name, c.name AS category_name, a.last_executed, a.amount FROM automations a JOIN categories c on c.id = a.category_id WHERE a.user_id = ?",
        [user_id]
    );
    return rows;
}

exports.editUpcomingBillDynamic = async (setClause, params) => {
    const [result] = await db.query(
        `UPDATE automations SET ${setClause} WHERE id = ?`,
        params
    );
    return result;
};

exports.addUpcomingBill = async (user_id, category_id, name, beneficiary, amount, type, repeat_every, repeat_unit, next_execution_date, last_executed, description, active) => {
    const [rows] = await db.query(
        "INSERT INTO automations (user_id, category_id, name, beneficiary, amount, type, repeat_every, repeat_unit, next_execution_date, last_executed, description, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [user_id, category_id, name, beneficiary, amount, type, repeat_every, repeat_unit, next_execution_date, last_executed, description, active]
    );
    return rows;
};

exports.deleteBillById = async (id) => {
    const [result] = await db.query(
        "DELETE FROM automations WHERE id = ?",
        [id]
    );
    return result;
};

exports.viewBillDetailsById = async (id) => {
    const [rows] = await db.query (
        "SELECT a.*, c.name AS category_name FROM automations a JOIN categories c ON a.category_id = c.id WHERE a.id = ?",
        [id]
    );
    return rows;
};

exports.getAllIncomes = async (user_id) => {
    const [rows] = await db.query("SELECT t.*, c.name AS category_name FROM transactions t JOIN categories c ON t.category_id = c.id WHERE user_id = ? and t.type = 'Income'", [user_id]);
    return rows;
};

