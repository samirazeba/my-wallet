const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../../controllers/fileUploadController');
const upload = require('../../../../middleware/multerPdfUpload');
const pdfParseController = require('../../../../controllers/pdfParseController');

router.post("/pdf", upload.single("file"), fileUploadController.uploadFile);

router.post("/parse-pdf", pdfParseController.parseUnincreditBankPdf);

module.exports = router;