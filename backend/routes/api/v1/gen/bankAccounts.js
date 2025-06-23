const express = require('express');
const router = express.Router();
const bankAccountsController = require('../../../../controllers/bankAccountsController');
const authenticateToken = require('../../../../middleware/auth');

router.get('/all', authenticateToken, bankAccountsController.getAllBankAccounts);
router.get('/info', authenticateToken, bankAccountsController.getBankAccountInfo);

module.exports = router;