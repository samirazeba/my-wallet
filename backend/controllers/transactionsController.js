const transactionsModel = require("../models/transactionsModel");

exports.getAllTransactions = async (req, res) => {
    try {
        const userId = req.params.user_id; // Assuming user_id is passed as a URL parameter
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const transactions = await transactionsModel.getAllTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getDashboardTransactionData = async (req, res) => {
    try {
        const {userId} = req.params // Assuming user_id is passed as a URL parameter
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const transactions = await transactionsModel.getDashboardTransactionData(userId);
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching dashboard transaction data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.addTransactions = async (req, res) => {
    try {
        const { user_id, bank_account_id, category_id, name, beneficiary, amount, type, description } = req.body;
        if (!user_id || !bank_account_id || !category_id || !name || !beneficiary || !amount || !type) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const transaction = await transactionsModel.addTransaction(user_id, bank_account_id, category_id, name, beneficiary, amount, type, description);
        res.status(201).json(transaction);
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.viewDetailsByTransactionId = async (req, res) => {
    try {
        const transactionId = req.params.id; // Assuming transaction ID is passed as a URL parameter
        if (!transactionId) {
            return res.status(400).json({ error: "Transaction ID is required" });
        }
        const transactionDetails = await transactionsModel.viewDetailsByTransactionId(transactionId);
        if (transactionDetails.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json(transactionDetails);
    } catch (error) {
        console.error("Error fetching transaction details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}