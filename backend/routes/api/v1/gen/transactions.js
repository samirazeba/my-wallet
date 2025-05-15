const express = require('express');
const router = express.Router();
const userController = require('../../../../controllers/transactionsController');

// Route to get all transactions
router.get('/all/:userId', userController.getAllTransactions);

// Route to get dashboard transaction data
router.get('/dashboard/:userId', userController.getDashboardTransactionData);

// Route to add a new transaction
router.post('/add', userController.addTransactions);

// Route to view transaction details by ID
router.get('/view/:id', userController.viewDetailsByTransactionId);
module.exports = router;