const savingGoalModel = require("../models/savingGoalModel");
const bankAccountsModel = require("../models/bankAccountsModel");
const aiService = require("../services/aiServices");

exports.addSavingGoal = async (req, res) => {
  const { user_id, name, target_amount, target_date, goal_description } =
    req.body;
  try {
    // 1. Generate AI response
    const ai_response = await aiService.generateAIResponse(
      goal_description,
      target_amount,
      target_date
    );

    // 2. Save the goal with the AI response
    const result = await savingGoalModel.addSavingGoal(
      user_id,
      name,
      target_amount,
      target_date,
      goal_description,
      ai_response
    );

    // 3. Save to history (old and new are the same)
    await savingGoalModel.addSavingGoalHistory({
      user_id,
      saving_goal_id: result.insertId,
      old_target_amount: target_amount,
      new_target_amount: target_amount,
      old_target_date: target_date,
      new_target_date: target_date,
      old_goal_description: goal_description,
      new_goal_description: goal_description,
      old_ai_response: ai_response,
      new_ai_response: ai_response,
    });

    res.status(201).json({
      message: "Saving goal added",
      goalId: result.insertId,
      ai_response,
    });
  } catch (error) {
    console.error("Add goal error:", error);
    res.status(500).json({ message: "Error adding goal" });
  }
};

exports.editSavingGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = [
      "name",
      "target_amount",
      "target_date",
      "goal_description",
    ];

    // 1. Fetch existing goal
    const existingGoal = await savingGoalModel.getSavingGoalById(id);
    if (!existingGoal) {
      return res.status(404).json({ message: "Saving goal not found" });
    }

    // 2. Merge fields: use new value if provided, otherwise existing
    const fieldsToUpdate = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        fieldsToUpdate[key] = req.body[key];
      }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // 3. For AI, use merged values
    const name = fieldsToUpdate.name ?? existingGoal.name;
    const goal_description =
      fieldsToUpdate.goal_description ?? existingGoal.goal_description;
    const target_amount =
      fieldsToUpdate.target_amount ?? existingGoal.target_amount;
    const target_date = fieldsToUpdate.target_date ?? existingGoal.target_date;

    // 4. Generate new AI response
    const ai_response = await aiService.generateAIResponse(
      goal_description,
      target_amount,
      target_date
    );

    // 5. Update the existing saving goal
    await savingGoalModel.editSavingGoal(id, {
      name,
      target_amount,
      target_date,
      goal_description,
      ai_response,
    });

    // 6. Save to history (old and new values)
    await savingGoalModel.addSavingGoalHistory({
      user_id: existingGoal.user_id,
      saving_goal_id: id, // use the same id, not a new one
      old_target_amount: existingGoal.target_amount,
      new_target_amount: target_amount,
      old_target_date: existingGoal.target_date,
      new_target_date: target_date,
      old_goal_description: existingGoal.goal_description,
      new_goal_description: goal_description,
      old_ai_response: existingGoal.ai_response,
      new_ai_response: ai_response,
    });

    res.status(200).json({
      message: "Saving goal updated successfully",
      ai_response,
      updated_goal_id: id,
    });
  } catch (error) {
    console.error("Update goal error:", error);
    res.status(500).json({ message: "Error editing goal" });
  }
};

exports.deleteSavingGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await savingGoalModel.softDeleteSavingGoal(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Saving goal not found" });
    }

    res.status(200).json({ message: "Saving goal deleted successfully" });
  } catch (error) {
    console.error("Delete goal error: ", error);
    res.status(500).json({ message: "Error deleting goal" });
  }
};

exports.getSavingGoalsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { start, end, sortBy, sortOrder } = req.query;
    const savingGoals = await savingGoalModel.getSavingGoalsByUserId(
      user_id,
      start,
      end,
      sortBy,
      sortOrder
    );
    if (savingGoals.length === 0) {
      return res
        .status(404)
        .json({ message: "No saving goals found for this user" });
    }
    res.status(200).json({ savingGoals });
  } catch (error) {
    console.error("Get saving goals error: ", error);
    res.status(500).json({ message: "Error fetching saving goals" });
  }
};

exports.getSavingGoalsHistoryByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { start, end, sortBy, sortOrder } = req.query;
    const savingGoals = await savingGoalModel.getSavingGoalsHistoryByUserId(
      user_id,
      start,
      end,
      sortBy,
      sortOrder
    );
    if (!savingGoals.length) {
      return res.status(404).json({ message: "No saving goals history found for this user" });
    }
    res.status(200).json({ savingGoals });
  } catch (error) {
    console.error("Get saving goals history error: ", error);
    res.status(500).json({ message: "Error fetching saving goals history" });
  }
};

exports.addToSavingGoal = async (req, res) => {
  try {
    const { goal_id, bank_account_id, amount } = req.body;
    const user_id = req.user.id;

    if (!goal_id || !bank_account_id || !amount || amount <= 0) {
      return res.status(400).json({ error: "Missing or invalid fields." });
    }

    // 1. Get bank account and check balance
    const bankAccount = await bankAccountsModel.getBankAccountById(bank_account_id, user_id);
    if (!bankAccount) {
      return res.status(404).json({ error: "Bank account not found." });
    }
    if (bankAccount.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    // 2. Deduct from bank account
    await bankAccountsModel.updateBankAccountBalance(bank_account_id, amount);

    // 3. Add to saving goal
    await savingGoalModel.addToSavingGoal(goal_id, user_id, bank_account_id, amount);

    // 4. Return updated goal
    const updatedGoal = await savingGoalModel.getSavingGoalById(goal_id);
    res.status(200).json({
      message: "Amount added to saving goal.",
      goal: updatedGoal,
    });
  } catch (error) {
    console.error("Add to saving goal error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};exports.addToSavingGoal = async (req, res) => {
  try {
    const { goal_id, bank_account_id, amount } = req.body;
    const user_id = req.user.id;

    if (!goal_id || !bank_account_id || !amount || amount <= 0) {
      return res.status(400).json({ error: "Missing or invalid fields." });
    }

    // 1. Get bank account and check balance
    const bankAccount = await bankAccountsModel.getBankAccountById(bank_account_id, user_id);
    if (!bankAccount) {
      return res.status(404).json({ error: "Bank account not found." });
    }
    if (bankAccount.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    // 2. Deduct from bank account
    await bankAccountsModel.updateBankAccountBalance(bank_account_id, amount);

    // 3. Add to saving goal
    await savingGoalModel.addToSavingGoal(goal_id, user_id, bank_account_id, amount);

    // 4. Return updated goal
    const updatedGoal = await savingGoalModel.getSavingGoalById(goal_id);
    res.status(200).json({
      message: "Amount added to saving goal.",
      goal: updatedGoal,
    });
  } catch (error) {
    console.error("Add to saving goal error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};