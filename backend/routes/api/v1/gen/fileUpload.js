const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../../controllers/fileUploadController');
const upload = require('../../../../middleware/multerPdfUpload');
const pdfParseController = require('../../../../controllers/pdfParseController');
const transactionsController = require('../../../../controllers/transactionsController');
const authenticateToken = require('../../../../middleware/auth');


router.post("/pdf", upload.single("file"), fileUploadController.uploadFile);

router.post("/parse-pdf", pdfParseController.parseUnincreditBankPdf);

router.post("/save-parsed-transactions", authenticateToken, transactionsController.saveParsedTransactions);

router.post(
  "/parse-and-save-pdf",
  authenticateToken,
  async (req, res) => {
    try {
      console.log("Received filename:", req.body.filename);
      const transactions = await pdfParseController.parseUnincreditBankPdfInternal(req.body.filename);
      console.log("Parsed transactions:", transactions.length);

      const result = await transactionsController.saveParsedTransactionsInternal(req.user.id, transactions);
      console.log("Save result:", result);

      res.status(201).json(result);
    } catch (error) {
      console.error("Parse and save error:", error); // <--- This will show the real error!
      res.status(500).json({ error: "Failed to parse and save transactions" });
    }
  }
);

module.exports = router;