const express = require('express');
const router = express.Router();
const categoriesController = require('../../../../controllers/categoriesController');
const authenticateToken = require('../../../../middleware/auth');

router.get('/all', authenticateToken, categoriesController.getAllCategories);

module.exports = router;