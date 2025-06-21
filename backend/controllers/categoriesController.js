const categoriesModel = require("../models/categoriesModel");

exports.getTotalSpentPerCategory = async (req, res) => {
  try {
    const userId = req.user.id; // From token
    const { start, end, sort_by, sort_order } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const result = await categoriesModel.getTotalSpentPerCategory(
      userId,
      start,
      end,
      sort_by,
      sort_order
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching total spent per category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};