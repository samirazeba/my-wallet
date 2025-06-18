const automationExecutor = require("../../../../controllers/jobController");
const express = require("express");
const router = express.Router();

router.post('/execute-automations', automationExecutor.automationExecutor);

module.exports = router;