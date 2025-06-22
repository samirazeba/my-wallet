const express = require('express');
const router = express.Router();
const categoriesController = require('../../../../controllers/categoriesController');
const authenticateToken = require('../../../../middleware/auth');

router.get('/all', categoriesController.getAllCategories);
router.get('/totals', authenticateToken, categoriesController.getTotalSpentPerCategory);

module.exports = router;