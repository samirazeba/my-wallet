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

// Route to get all expenses
router.get('/all-expenses/:userId', userController.getAllExpenses);

// Route to get all ubcoming bills
router.get('/upcoming-bills/:userId', userController.getUpcomingBills);

// Route to edit an upcoming bill
router.put('/edit-upcoming-bill/:id', userController.editUpcomingBill);

// Route to add an upcoming bill
router.post('/add-upcoming-bill', userController.addUpcomingBill);

// Route to delete an upcoming bill
router.delete('/delete-upcoming-bill/:id', userController.deleteBillById);

// Route to view bill details by ID 
router.get('/view-upcoming-bill/:id', userController.viewBillDetailsById);

// Route to view all incomes
router.get('/all-incomes/:userId', userController.getAllIncomes);


module.exports = router;