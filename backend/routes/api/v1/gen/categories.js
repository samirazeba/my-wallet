const express = require('express');
const router = express.Router();
const categoriesController = require('../../../../controllers/categoriesController');
const authenticateToken = require('../../../../middleware/auth');

// Route to get total spent per category (with date filter and sorting)
router.get('/totals', authenticateToken, categoriesController.getTotalSpentPerCategory);

module.exports = router;