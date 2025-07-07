const axios = require("axios");
require("dotenv").config();

const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";
const MODEL = "meta-llama/Llama-3-70b-chat-hf"; // Best for classification

/**
 * Get AI category for a transaction.
 * @param {Object} transaction - { name, amount, date, beneficiary }
 * @returns {Promise<string>} - AI-generated category
 */
exports.categorizeTransaction = async (transaction) => {
  const prompt = `
Classify the following bank transaction into one of these categories: Groceries, Fuel, Salary, Utilities, Rent, Entertainment, Fees, Insurance, Education, Other.
Return only the category name, nothing else.

Transaction:
- Name: ${transaction.name}
- Amount: ${transaction.amount}
- Date: ${transaction.date}
- Beneficiary: ${transaction.beneficiary}
`;

  const response = await axios.post(
    TOGETHER_API_URL,
    {
      model: MODEL,
      messages: [
        { role: "system", content: "You are a financial assistant. Classify transactions into categories. Only return the category name." },
        { role: "user", content: prompt }
      ],
      temperature: 0.1, // Low temperature for deterministic output
      max_tokens: 10
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_AI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  // Return the trimmed category
  return response.data.choices[0].message.content.trim();
};