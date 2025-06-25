const transactionsModel = require("../models/transactionsModel");
const bankAccountsModel = require("../models/bankAccountsModel");

exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id; //From token
    const {start, end, bank_account_id, sort_by, sort_order} = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const transactions = await transactionsModel.getAllTransactions(userId, start, end, bank_account_id, sort_by, sort_order);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDashboardTransactionData = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming user_id is passed as a URL parameter
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const transactions = await transactionsModel.getDashboardTransactionData(
      userId
    );
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching dashboard transaction data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addTransactions = async (req, res) => {
  try {
    const {
      user_id,
      bank_account_id,
      category_id,
      name,
      beneficiary,
      amount,
      type,
      description,
    } = req.body;
    if (
      !user_id ||
      !bank_account_id ||
      !category_id ||
      !name ||
      !beneficiary ||
      !amount ||
      !type
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const transaction = await transactionsModel.addTransaction(
      user_id,
      bank_account_id,
      category_id,
      name,
      beneficiary,
      amount,
      type,
      description
    );
    // Update bank account balance after transaction is added
    await bankAccountsModel.updateBankAccountBalance(bank_account_id, amount, type);
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
    const transactionDetails =
      await transactionsModel.viewDetailsByTransactionId(transactionId);
    if (transactionDetails.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transactionDetails);
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { start, end, bank_account_id, sort_by, sort_order } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const expenses = await transactionsModel.getAllExpenses(userId, start, end, bank_account_id, sort_by, sort_order);
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUpcomingBills = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bank_account_id, sort_by, sort_order } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }
    const bills = await transactionsModel.getUpcomingBills(
      userId,
      bank_account_id,
      sort_by,
      sort_order
    );
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching upcoming bills:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.editUpcomingBill = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = [
      "category_id",
      "name",
      "beneficiary",
      "amount",
      "type",
      "repeat_every",
      "repeat_unit",
      "next_execution_date",
      "last_executed",
      "description",
      "active",
    ];
    const updates = [];
    const params = [];

    // Build SET clause and params array dynamically
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        params.push(req.body[field]);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    params.push(id); // For WHERE clause

    const result = await transactionsModel.editUpcomingBillDynamic(
      updates.join(", "),
      params
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Upcoming bill not found" });
    }

    res.status(200).json({ message: "Upcoming bill updated successfully" });
  } catch (error) {
    console.error("Error editing upcoming bill:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addUpcomingBill = async (req, res) => {
  try {
    const {
      user_id,
      category_id,
      name,
      beneficiary,
      amount,
      type,
      repeat_every,
      repeat_unit,
      next_execution_date,
      last_executed,
      description,
      active,
    } = req.body;
    if (
      user_id === undefined ||
      category_id === undefined ||
      name === undefined ||
      beneficiary === undefined ||
      amount === undefined ||
      type === undefined ||
      repeat_every === undefined ||
      repeat_unit === undefined ||
      next_execution_date === undefined ||
      last_executed === undefined ||
      active === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const bill = await transactionsModel.addUpcomingBill(
      user_id,
      category_id,
      name,
      beneficiary,
      amount,
      type,
      repeat_every,
      repeat_unit,
      next_execution_date,
      last_executed,
      description,
      active
    );
    res.status(201).json(bill);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBillById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Bill ID is required" });
        }

        const result = await transactionsModel.deleteBillById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Bill not found" });
        }

        res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        console.error("Error deleting bill:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.viewBillDetailsById = async (req, res) => {
  try {
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({ error: "Bill ID is required" });
    }
    const billDetails = await transactionsModel.viewBillDetailsById(id);
    if (billDetails.length === 0) {
      return res.status(404).json({ error: "Bill not found" });
    }
    res.status(200).json(billDetails);
  } catch (error) {
    console.error("Error fetching bill details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllIncomes = async (req, res) => {
    try {
        const { userId } = req.params;
        const { start, end, bank_account_id, sort_by, sort_order } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const incomes = await transactionsModel.getAllIncomes(userId, start, end, bank_account_id, sort_by, sort_order);
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getTotalExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { start, end, bank_account_id } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const total = await transactionsModel.getTotalExpenses(userId, start, end, bank_account_id);
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTotalIncomes = async (req, res) => {
  try {
    const { userId } = req.params;
    const { start, end, bank_account_id } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const total = await transactionsModel.getTotalIncomes(userId, start, end, bank_account_id);
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error fetching total incomes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};