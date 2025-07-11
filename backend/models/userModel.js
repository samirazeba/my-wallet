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

exports.getUserByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0]; // returns one user or undefined
};

exports.getUsersFullName = async (user_id) => {
    const [rows] = await db.query(
        "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users WHERE id = ?",
        [user_id]
    );
    return rows[0].full_name; // returns the full name of the user
};

exports.getUserById = async (user_id) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE id = ?",
        [user_id]
    );
    return rows[0]; // returns one user or undefined
}