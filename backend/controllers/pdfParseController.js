const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const aiCategorizeService = require("../services/aiCategorizeService");
// New parser function, adapted for controller usage
function parseUnicreditStatement(text) {
  // Extract bank account
  const bankAccMatch = text.match(/Broj racuna:\s*(\d+)/);
  const bank_account = bankAccMatch ? bankAccMatch[1] : "Unknown";

  // Split into lines and clean
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Find all dates (format: dd.mm.yyyy)
  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  const dates = [];

  // Find all transaction amounts (format: -123.45 or 123.45)
  const amountRegex = /^-?\d+\.\d{2}$/;
  const amounts = [];

  // First pass to collect dates and amounts
  lines.forEach((line) => {
    if (dateRegex.test(line)) dates.push(line);
    if (amountRegex.test(line)) amounts.push(line);
  });

  // Filter amounts to only include transaction amounts (exclude balance amounts)
  const transactionAmounts = amounts.slice(dates.length, dates.length * 2);

  // Skip patterns for non-transaction lines
  const skipPatterns = [
    /BAM/i,
    /stanje/i,
    /broj racuna/i,
    /datum/i,
    /opis prometa/i,
    /iznos prometa/i,
    /novo stanje/i,
    /prethodno stanje/i,
    /promet po racunu/i,
    /izvod po/i,
    /glavinic/i,
    /unicredit/i,
    /reklamacije/i,
    /transakcijski/i,
    /dopušteno/i,
    /kamatna/i,
    /mjesecna/i,
    /postovani/i,
    /zahvaljujemo/i,
    /informiramo/i,
    /aktivnosti/i,
    /^www\./i,
    /^info@/i,
    /^tel:/i,
    /^080/i,
    /^\d{1,2}$/,
    /^-?\d+\.\d{2}$/,
    /^\d{2}\.\d{2}\.\d{4}$/,
  ];

  // Extract merchant names with multi-line handling
  const merchantNames = [];
  const maxLength = 72;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip if matches any skip pattern
    if (skipPatterns.some((pattern) => pattern.test(line))) continue;

    let transactionName = line;

    // Check if we need to merge with next lines
    if (line.length >= maxLength) {
      let j = i + 1;
      while (
        j < lines.length &&
        !skipPatterns.some((pattern) => pattern.test(lines[j]))
      ) {
        transactionName += " " + lines[j];
        j++;

        // Stop if the combined length is less than maxLength
        if (transactionName.length < maxLength) break;
      }
      i = j - 1; // Skip the lines we've merged
    }

    merchantNames.push(transactionName);
  }

  // Match dates with amounts and merchant names
  const transactions = [];
  const maxTransactions = Math.min(
    dates.length,
    transactionAmounts.length,
    merchantNames.length
  );

  for (let i = 0; i < maxTransactions; i++) {
    const amount = parseFloat(transactionAmounts[i]);

    transactions.push({
      date: dates[i],
      name: merchantNames[i],
      beneficiary: "Beneficiary",
      amount: amount,
      type: amount < 0 ? "Expense" : "Income",
      category: "category",
      bank_account: bank_account,
    });
  }

  return transactions;
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
exports.parseUnincreditBankPdf = async (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }
    const filePath = path.join(__dirname, "../uploads", filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // Debug mode: return raw PDF text for inspection
    if (req.query.debug === "1") {
      return res.json({ text: pdfData.text });
    }

    const transactions = parseUnicreditStatement(pdfData.text);
    if (transactions.length === 0) {
      return res
        .status(200)
        .json({
          transactions: [],
          message: "No transactions found. Check PDF format.",
        });
    }

    // AI categorize each transaction
    const categorizedTransactions = [];
    for (const tx of transactions) {
      const category = await aiCategorizeService.categorizeTransaction(tx);
      categorizedTransactions.push({ ...tx, category });
      await delay(1200); // 1.2 seconds between requests (adjust as needed)
    }

    return res.json({ transactions: categorizedTransactions });
  } catch (err) {
    console.error("PDF parse error:", err);
    res.status(500).json({ error: "Failed to parse PDF" });
  }
};
