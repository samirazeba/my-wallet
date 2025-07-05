const path = require("path");

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(200).json({
        message: "File uploaded successfully",
        filename: req.file.filename, 
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
    });
};