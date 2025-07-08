const path = require("path");
const fs = require("fs");

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

exports.deleteFile = (req, res) => {
    const { filename } = req.body;
    if (!filename) {
        return res.status(400).json({ error: "Filename is required" });
    }
    const filePath = path.join(__dirname, "../uploads", filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).json({ error: "File not found or already deleted" });
        }
        res.status(200).json({ message: "File deleted successfully" });
    });
};