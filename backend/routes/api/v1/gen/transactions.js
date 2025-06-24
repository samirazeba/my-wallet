const express = require('express');
const router = express.Router();
const transactionsController = require('../../../../controllers/transactionsController');
const authenticateToken = require('../../../../middleware/auth');

// Route to get all transactions
router.get('/all/', authenticateToken, transactionsController.getAllTransactions);

// Route to get dashboard transaction data
router.get('/dashboard/:userId', transactionsController.getDashboardTransactionData);

// Route to add a new transaction
router.post('/add', transactionsController.addTransactions);

// Route to view transaction details by ID
router.get('/view/:id', transactionsController.viewDetailsByTransactionId);

// Route to get all expenses
router.get('/all-expenses/:userId', transactionsController.getAllExpenses);

// Route to get all ubcoming bills
router.get('/upcoming-bills/:userId', transactionsController.getUpcomingBills);

// Route to edit an upcoming bill
router.put('/edit-upcoming-bill/:id', transactionsController.editUpcomingBill);

// Route to add an upcoming bill
router.post('/add-upcoming-bill', transactionsController.addUpcomingBill);

// Route to delete an upcoming bill
router.delete('/delete-upcoming-bill/:id', transactionsController.deleteBillById);

// Route to view bill details by ID 
router.get('/view-upcoming-bill/:id', transactionsController.viewBillDetailsById);

// Route to view all incomes
router.get('/all-incomes/:userId', transactionsController.getAllIncomes);

router.get('/total-expenses/:userId', transactionsController.getTotalExpenses);

router.get('/total-incomes/:userId', transactionsController.getTotalIncomes);



module.exports = router;