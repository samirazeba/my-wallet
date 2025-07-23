const cron = require("node-cron");
const db = require("../config/db");
const bankAccountsModel = require("../models/bankAccountsModel");

function getNextExecutionDate(current, repeatEvery, repeatUnit) {
  const date = new Date(current);
  switch (repeatUnit) {
    case "Day":
      date.setDate(date.getDate() + parseInt(repeatEvery, 10));
      break;
    case "Week":
      date.setDate(date.getDate() + parseInt(repeatEvery, 10) * 7);
      break;
    case "Month":
      date.setMonth(date.getMonth() + parseInt(repeatEvery, 10));
      break;
    case "Year":
      date.setFullYear(date.getFullYear() + parseInt(repeatEvery, 10));
      break;
    default:
      date.setDate(date.getDate() + 1);
  }
  return date.toISOString().slice(0, 10); //YYYY-MM-DD
}

async function executeAutomations() {
  try {
    const [automations] = await db.query(
      `SELECT * FROM automations WHERE active = 'true' AND next_execution_date <= CURDATE()`
    );
    for (const automation of automations) {
      await db.query(
        `INSERT INTO transactions
            (user_id, bank_account_id, category_id, name, beneficiary, amount, type, description, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          automation.user_id,
          automation.bank_account_id || 1,
          automation.category_id,
          automation.name,
          automation.beneficiary,
          automation.amount,
          automation.type,
          automation.description,
        ]
      );
      // Update bank account balance after automation transaction
      await bankAccountsModel.updateBankAccountBalance(
        automation.bank_account_id || 1,
        automation.amount,
        automation.type
      );
      const newNextDate = getNextExecutionDate(
        automation.next_execution_date,
        automation.repeat_every,
        automation.repeat_unit
      );
      await db.query(
        `UPDATE automations SET last_executed = ?, next_execution_date = ? WHERE id = ?`,
        [automation.next_execution_date, newNextDate, automation.id]
      );
    }
    if (automations.length > 0) {
      console.log(`Executed ${automations.length} automations.`);
    }
  } catch (err) {
    console.error("Error executing automations:", err);
  }
}

cron.schedule("03 13 * * *", executeAutomations);
executeAutomations(); // Initial execution on server start

module.exports = { executeAutomations };
