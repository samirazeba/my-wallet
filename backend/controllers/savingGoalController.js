const savingGoalModel = require('../models/savingGoalModel');
const aiService = require('../services/aiServices');

exports.addSavingGoal = async (req, res) => {
  const { user_id, name, target_amount, target_date, goal_description } = req.body;
  try {
    // 1. Generate AI response
    const ai_response = await aiService.generateAIResponse(goal_description, target_amount, target_date);

    // 2. Save the goal with the AI response
    const result = await savingGoalModel.addSavingGoal(
      user_id, name, target_amount, target_date, goal_description, ai_response
    );

    // 3. Return both
    res.status(201).json({ 
      message: "Saving goal added", 
      goalId: result.insertId,
      ai_response 
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
      "ai_response"
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
    const goal_description = fieldsToUpdate.goal_description ?? existingGoal.goal_description;
    const target_amount = fieldsToUpdate.target_amount ?? existingGoal.target_amount;
    const target_date = fieldsToUpdate.target_date ?? existingGoal.target_date;

    // 4. Generate new AI response if any relevant field changed
    const ai_response = await aiService.generateAIResponse(goal_description, target_amount, target_date);
    fieldsToUpdate.ai_response = ai_response;

    // 5. Update the goal
    const result = await savingGoalModel.editSavingGoal(id, fieldsToUpdate);

    res.status(200).json({
      message: "Saving goal updated successfully",
      ai_response
    });
  } catch (error) {
    console.error("Update goal error:", error);
    res.status(500).json({ message: "Error editing goal" });
  }
};

exports.deleteSavingGoal = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await savingGoalModel.deleteSavingGoal(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Saving goal not found" });
        }

        res.status(200).json({ message: "Saving goal deleted successfully" });
    } catch (error) {
        console.error("Delete goal error: ", error);
        res.status(500).json({ message: "Error deleting goal" });
    }
}

exports.getSavingGoalsByUserId = async (req, res) => {
    try{
        const {user_id} = req.params;
        const savingGoals = await savingGoalModel.getSavingGoalsByUserId(user_id);
        if (savingGoals.length === 0) {
            return res.status(404).json({ message: "No saving goals found for this user" });
        }
        res.status(200).json({ savingGoals });
    } catch (error) {
        console.error("Get saving goals error: ", error);
        res.status(500).json({ message: "Error fetching saving goals" });
    }
};