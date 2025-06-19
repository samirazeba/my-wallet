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

  const [result] = await db.query(
    `UPDATE saving_goals SET ${setClause} WHERE id = ?`,
    params
  );
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

exports.getSavingGoalsByUserId = async (user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM saving_goals WHERE user_id = ? AND is_deleted = 0",
    [user_id]
  );
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
  const [rows] = await db.query("UPDATE saving_goals SET is_deleted = 1 WHERE id = ?", [id]);
  return rows;
};
