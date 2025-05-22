const express = require('express');
const router = express.Router();
const userController = require('../../../../controllers/userController');
const authenticateToken = require('../../../../middleware/auth');

router.get("/all", authenticateToken, userController.getAllUsers);

//register route
router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/getFullName/:user_id", authenticateToken, userController.getUserFullName);
module.exports = router;