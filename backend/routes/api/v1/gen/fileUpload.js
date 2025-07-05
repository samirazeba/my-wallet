const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../../controllers/fileUploadController');
const upload = require('../../../../middleware/multerPdfUpload');

router.post("/pdf", upload.single("file"), fileUploadController.uploadFile);

module.exports = router;