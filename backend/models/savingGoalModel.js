const db = require("../config/db");

exports.addSavingGoal = async (
  user_id,
  name,
  target_amount,
  target_date,
  goal_description,
  ai_response
) => {
  const [result] = await db.query(
    `INSERT INTO saving_goals (user_id, name, target_amount, target_date, goal_description, ai_response, created_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [user_id, name, target_amount, target_date, goal_description, ai_response]
  );
  return result;
};

exports.editSavingGoal = async (id, fields) => {
  const setClause = Object.keys(fields)
    .map((key) => `${key} = ?`)
    .join(", ");
  const params = [...Object.values(fields), id];

  // Add updated_at to the SET clause
  const query = `UPDATE saving_goals SET ${setClause}, updated_at = NOW() WHERE id = ?`;

  const [result] = await db.query(query, params);
  return result;
};

exports.getSavingGoalById = async (id) => {
  const [rows] = await db.query("SELECT * FROM saving_goals WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

exports.deleteSavingGoal = async (id) => {
  const [rows] = await db.query("DELETE FROM saving_goals WHERE id = ?", [id]);
  return rows;
};

exports.getSavingGoalsByUserId = async (user_id, start, end, sortBy, sortOrder) => {
  let query = "SELECT * FROM saving_goals WHERE user_id = ? AND is_deleted = 0";
  const params = [user_id];
  if (start && end) {
    query += " AND DATE(created_at) BETWEEN ? AND ?";
    params.push(start, end);
  }
  // Add sorting
  if (sortBy) {
    const allowedSort = ["created_at", "target_amount", "updated_at"];
    const allowedOrder = ["asc", "desc"];
    if (allowedSort.includes(sortBy) && allowedOrder.includes((sortOrder || "").toLowerCase())) {
      query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    } else {
      query += " ORDER BY updated_at DESC";
    }
  } else {
    query += " ORDER BY updated_at DESC";
  }
  const [rows] = await db.query(query, params);
  return rows;
};

exports.addSavingGoalHistory = async ({
  user_id,
  saving_goal_id,
  old_target_amount,
  new_target_amount,
  old_target_date,
  new_target_date,
  old_goal_description,
  new_goal_description,
  old_ai_response,
  new_ai_response,
}) => {
  const [result] = await db.query(
    `INSERT INTO saving_goals_history 
      (user_id, saving_goal_id, old_target_amount, new_target_amount, old_target_date, new_target_date, old_goal_decsription, new_goal_description, old_ai_response, new_ai_response)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      saving_goal_id,
      old_target_amount,
      new_target_amount,
      old_target_date,
      new_target_date,
      old_goal_description,
      new_goal_description,
      old_ai_response,
      new_ai_response,
    ]
  );
  return result;
};

exports.softDeleteSavingGoal = async (id) => {
  const [rows] = await db.query(
    "UPDATE saving_goals SET is_deleted = 1 WHERE id = ?",
    [id]
  );
  return rows;
};

exports.getSavingGoalsHistoryByUserId = async (user_id, start, end, sortBy, sortOrder) => {
  let query = `
    SELECT h.*, g.name AS goal_name
    FROM saving_goals_history h
    JOIN saving_goals g ON h.saving_goal_id = g.id
    WHERE h.user_id = ?
  `;
  const params = [user_id];
  if (start && end) {
    query += " AND DATE(h.updated_at) BETWEEN ? AND ?";
    params.push(start, end);
  }
  if (sortBy) {
    const allowedSort = ["updated_at", "old_target_amount", "new_target_amount"];
    const allowedOrder = ["asc", "desc"];
    if (allowedSort.includes(sortBy) && allowedOrder.includes((sortOrder || "").toLowerCase())) {
      query += ` ORDER BY h.${sortBy} ${sortOrder.toUpperCase()}`;
    } else {
      query += " ORDER BY h.updated_at DESC";
    }
  } else {
    query += " ORDER BY h.updated_at DESC";
  }
  const [rows] = await db.query(query, params);
  return rows;
};

exports.expireOldSavingGoals = async () => {
  const [result] = await db.query(
    "UPDATE saving_goals SET is_expired = 1 WHERE target_date < NOW() AND is_expired = 0"
  );
  return result;
};
