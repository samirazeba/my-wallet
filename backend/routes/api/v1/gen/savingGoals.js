const express = require('express');
const router = express.Router();
const savingGoalController = require('../../../../controllers/savingGoalController');
const authenticateToken = require('../../../../middleware/auth');

router.post("/add", savingGoalController.addSavingGoal);
//router.post("/generate-ai", savingGoalController.generateAIResponse);

router.put("/edit/:id", savingGoalController.editSavingGoal);

router.delete("/delete/:id", savingGoalController.deleteSavingGoal);

router.get("/get-by-user-id/:user_id", savingGoalController.getSavingGoalsByUserId);

router.get("/get-history-by-user-id/:user_id", savingGoalController.getSavingGoalsHistoryByUserId);

router.post("/add-to-goal", authenticateToken, savingGoalController.addToSavingGoal);

module.exports = router;