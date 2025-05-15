const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");

app.use(express.json());

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true // Allow cookies if needed
}));

const userRoutes = require("./routes/api/v1/gen/users");
const transactionRoutes = require("./routes/api/v1/gen/transactions");


app.use("/api/v1/gen/users", userRoutes);
app.use("/api/v1/gen/transactions", transactionRoutes);

app.listen (3000, ()=> {
    console.log ('Server is running on port 3000');
});