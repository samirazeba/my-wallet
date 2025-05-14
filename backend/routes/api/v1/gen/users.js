const express = require('express');
const router = express.Router();
const userController = require('../../../../controllers/userController');

router.get("/all", userController.getAllUsers);

//register route
router.post("/register", userController.register);

module.exports = router;