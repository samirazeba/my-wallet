const db = require("../config/db");

exports.getAllTransactions = async (
  user_id,
  start,
  end,
  bank_account_id,
  sort_by,
  sort_order
) => {
  let query =
    "SELECT t.*, c.name AS category_name FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = ?";
  const params = [user_id];

  if (start && end) {
    query += " AND DATE(t.created_at) BETWEEN ? AND ?";
    params.push(start, end);
  }
  if (bank_account_id) {
    query += " AND t.bank_account_id = ?";
    params.push(bank_account_id);
  }

  const allowedSortBy = ["created_at", "amount"];
  const allowedSortOrder = ["asc", "desc"];
  const sortBySafe = allowedSortBy.includes(sort_by) ? sort_by : "created_at";
  const sortOrderSafe = allowedSortOrder.includes(
    (sort_order || "").toLowerCase()
  )
    ? sort_order
    : "desc";

  query += ` ORDER BY t.${sortBySafe} ${sortOrderSafe.toUpperCase()}`;

  const [rows] = await db.query(query, params);
  return rows;
};

exports.getDashboardTransactionData = async (user_id) => {
  const [rows] = await db.query(
    "SELECT t.name, c.name AS category_name, t.created_at, t.amount FROM transactions t JOIN categories c on c.id = t.category_id WHERE t.user_id = ?",
    [user_id]
  );
  return rows;
};

exports.addTransaction = async (
  user_id,
  bank_account_id,
  category_id,
  name,
  beneficiary,
  amount,
  type,
  description,
  created_at
) => {
  const [rows] = await db.query(
    "INSERT INTO transactions (user_id, bank_account_id, category_id, name, beneficiary, amount, type, description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user_id,
      bank_account_id,
      category_id,
      name,
      beneficiary,
      amount,
      type,
      description,
      created_at || new Date(),
    ]
  );
  return rows;
};

exports.viewDetailsByTransactionId = async (id) => {
  const [rows] = await db.query(
    "SELECT c.name AS category_name, t.* FROM transactions t JOIN categories c on c.id = t.category_id WHERE t.id = ?",
    [id]
  );
  return rows;
};

exports.getAllExpenses = async (
  user_id,
  start,
  end,
  bank_account_id,
  sort_by,
  sort_order
) => {
  let query =
    "SELECT t.*, c.name AS category_name FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = ? AND t.type = 'Expense'";
  const params = [user_id];

  if (start && end) {
    query += " AND DATE(t.created_at) BETWEEN ? AND ?";
    params.push(start, end);
  }
  if (bank_account_id) {
    query += " AND t.bank_account_id = ?";
    params.push(bank_account_id);
  }

  const allowedSortBy = ["created_at", "amount"];
  const allowedSortOrder = ["asc", "desc"];
  const sortBySafe = allowedSortBy.includes(sort_by) ? sort_by : "created_at";
  const sortOrderSafe = allowedSortOrder.includes(
    (sort_order || "").toLowerCase()
  )
    ? sort_order
    : "desc";

  query += ` ORDER BY t.${sortBySafe} ${sortOrderSafe.toUpperCase()}`;

  const [rows] = await db.query(query, params);
  return rows;
};

exports.getUpcomingBills = async (
  user_id,
  bank_account_id,
  sort_by,
  sort_order
) => {
  let query = `
    SELECT a.*, c.name AS category_name 
    FROM automations a 
    JOIN categories c ON a.category_id = c.id 
    WHERE a.user_id = ?
  `;
  const params = [user_id];

  if (bank_account_id) {
    query += " AND a.bank_account_id = ?";
    params.push(bank_account_id);
  }

  // Default sort
  let sortBy = "a.last_executed";
  let sortOrder = "ASC";
  if (sort_by) {
    // Whitelist allowed columns
    if (["last_executed", "amount", "name"].includes(sort_by)) {
      sortBy = `a.${sort_by}`;
    }
  }
  if (sort_order && ["asc", "desc"].includes(sort_order.toLowerCase())) {
    sortOrder = sort_order.toUpperCase();
  }
  query += ` ORDER BY ${sortBy} ${sortOrder}`;

  const [rows] = await db.query(query, params);
  return rows;
};

exports.editUpcomingBillDynamic = async (setClause, params) => {
  const [result] = await db.query(
    `UPDATE automations SET ${setClause} WHERE id = ?`,
    params
  );
  return result;
};

exports.addUpcomingBill = async (
  user_id,
  bank_account_id,
  category_id,
  name,
  beneficiary,
  amount,
  type,
  repeat_every,
  repeat_unit,
  next_execution_date,
  last_executed,
  description,
  active
) => {
  const [rows] = await db.query(
    "INSERT INTO automations (user_id, bank_account_id, category_id, name, beneficiary, amount, type, repeat_every, repeat_unit, next_execution_date, last_executed, description, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user_id,
      bank_account_id,
      category_id,
      name,
      beneficiary,
      amount,
      type,
      repeat_every,
      repeat_unit,
      next_execution_date,
      last_executed,
      description,
      active,
    ]
  );
  return rows;
};

exports.deleteBillById = async (id) => {
  const [result] = await db.query("DELETE FROM automations WHERE id = ?", [id]);
  return result;
};

exports.viewBillDetailsById = async (id) => {
  const [rows] = await db.query(
    "SELECT a.*, c.name AS category_name FROM automations a JOIN categories c ON a.category_id = c.id WHERE a.id = ?",
    [id]
  );
  return rows;
};

exports.getAllIncomes = async (
  user_id,
  start,
  end,
  bank_account_id,
  sort_by,
  sort_order
) => {
  let query =
    "SELECT t.*, c.name AS category_name FROM transactions t JOIN categories c ON t.category_id = c.id WHERE user_id = ? and t.type = 'Income'";
  const params = [user_id];

  if (start && end) {
    query += " AND DATE(t.created_at) BETWEEN ? AND ?";
    params.push(start, end);
  }
  if (bank_account_id) {
    query += " AND t.bank_account_id = ?";
    params.push(bank_account_id);
  }

  const allowedSortBy = ["created_at", "amount"];
  const allowedSortOrder = ["asc", "desc"];
  const sortBySafe = allowedSortBy.includes(sort_by) ? sort_by : "created_at";
  const sortOrderSafe = allowedSortOrder.includes(
    (sort_order || "").toLowerCase()
  )
    ? sort_order
    : "desc";

  query += ` ORDER BY t.${sortBySafe} ${sortOrderSafe.toUpperCase()}`;

  const [rows] = await db.query(query, params);
  return rows;
};

exports.getTotalExpenses = async (user_id, start, end, bank_account_id) => {
  let query = `
    SELECT SUM(amount) AS total 
    FROM transactions 
    WHERE user_id = ? AND type = 'Expense'
  `;
  const params = [user_id];

  if (start && end) {
    query += " AND DATE(created_at) BETWEEN ? AND ?";
    params.push(start, end);
  }
  if (bank_account_id) {
    query += " AND bank_account_id = ?";
    params.push(bank_account_id);
  }

  const [rows] = await db.query(query, params);
  return rows[0]?.total || 0;
};

exports.getTotalIncomes = async (user_id, start, end, bank_account_id) => {
  let query = `
    SELECT SUM(amount) AS total 
    FROM transactions 
    WHERE user_id = ? AND type = 'Income'
  `;
  const params = [user_id];

  if (start && end) {
    query += " AND DATE(created_at) BETWEEN ? AND ?";
    params.push(start, end);
  }
  if (bank_account_id) {
    query += " AND bank_account_id = ?";
    params.push(bank_account_id);
  }

  const [rows] = await db.query(query, params);
  return rows[0]?.total || 0;
};

exports.findTransaction = async ({ user_id, bank_account_id, category_id, date, amount, name, type }) => {
  const [rows] = await db.query(
    "SELECT id FROM transactions WHERE user_id = ? AND bank_account_id = ? AND category_id = ? AND name = ? AND amount = ? AND type = ? AND DATE(created_at) = ? LIMIT 1",
    [user_id, bank_account_id, category_id, name, amount, type, date]
  );
  return rows[0] || null;
};