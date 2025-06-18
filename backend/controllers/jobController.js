const automationExecutor = require ("../jobs/automationExecutor");

exports.automationExecutor = async (req, res) => {
    try {
        await automationExecutor.executeAutomations();
        res.json({message: "Automations Executed."});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}