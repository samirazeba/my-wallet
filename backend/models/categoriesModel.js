const db = require("../config/db");

// Get total spent per category for a user, with optional date filter and sorting
exports.getTotalSpentPerCategory = async (user_id, start, end, sort_by, sort_order) => {
  let query = `
    SELECT 
      c.id AS category_id,
      c.name AS category_name,
      IFNULL(SUM(t.amount), 0) AS total_spent
    FROM categories c
    LEFT JOIN transactions t 
      ON t.category_id = c.id 
      AND t.user_id = ?
      AND t.type = 'Expense'
  `;
  const params = [user_id];

  // Date filter
  if (start && end) {
    query += " AND DATE(t.created_at) BETWEEN ? AND ?";
    params.push(start, end);
  }

  query += " GROUP BY c.id, c.name";
  query += " HAVING total_spent > 0";

  // Sorting
  const allowedSortBy = ["category_name", "total_spent"];
  const allowedSortOrder = ["asc", "desc"];
  const sortBySafe = allowedSortBy.includes(sort_by) ? sort_by : "category_name";
  const sortOrderSafe = allowedSortOrder.includes((sort_order || "").toLowerCase()) ? sort_order : "asc";
  query += ` ORDER BY ${sortBySafe} ${sortOrderSafe.toUpperCase()}`;

  const [rows] = await db.query(query, params);
  return rows;
};