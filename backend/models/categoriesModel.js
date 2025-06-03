const db = require('../config/db');

exports.getAllCategories = async() => {
    const [rows] = await db.query('SELECT id, name FROM categories');
    return rows;
}