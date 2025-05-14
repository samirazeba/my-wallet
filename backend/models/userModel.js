const db = require("../config/db");

exports.getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
};

exports.register = async (first_name, last_name, email, password, phone_number) => {
    const [rows] = await db.query(
        'INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)',
        [first_name, last_name, email, password, phone_number]
    );
    return rows;
};