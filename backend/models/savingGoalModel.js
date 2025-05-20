const db = require('../config/db');

exports.addSavingGoal = async (user_id, name, target_amount, target_date, goal_description, ai_response) => {
  const [result] = await db.query(
    `INSERT INTO saving_goals (user_id, name, target_amount, target_date, goal_description, ai_response, created_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [user_id, name, target_amount, target_date, goal_description, ai_response]
  );
  return result;
};

exports.editSavingGoal = async (id, fields) => {
    const setClause = Object.keys(fields).map(key => `${key} = ?`).join(', ');
    const params = [...Object.values(fields), id];

    const [result] = await db.query(
        `UPDATE saving_goals SET ${setClause} WHERE id = ?`,
        params 
    );
    return result;
};

exports.getSavingGoalById = async (id) => {
  const [rows] = await db.query("SELECT * FROM saving_goals WHERE id = ?", [id]);
  return rows[0];
};

exports.deleteSavingGoal = async (id) => {
    const [rows] = await db.query(
        "DELETE FROM saving_goals WHERE id = ?",
        [id]
    );
    return rows;
};

exports.getSavingGoalsByUserId = async (user_id) => {
    const [rows] = await db.query(
        "SELECT * FROM saving_goals WHERE user_id = ?",
        [user_id] 
    );
    return rows;
}