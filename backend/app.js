require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");

app.use(express.json());

// Enable trust proxy - CRITICAL for secure cookies behind a proxy
app.set('trust proxy', 1);

// Session configuration
app.use(session({ 
  secret: process.env.JWT_SECRET, 
  resave: true,
  saveUninitialized: true,
  name: 'session_name', 
  cookie: {
    secure: true, 
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none',
    path: '/'
  },
  proxy: true
}));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "pragma",
      "Accept",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);

// Add additional headers for cookies
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


const userRoutes = require("./routes/api/v1/gen/users");
const transactionRoutes = require("./routes/api/v1/gen/transactions");
const savingGoalsRoutes = require("./routes/api/v1/gen/savingGoals");
const categoriesRoutes = require("./routes/api/v1/gen/categories");
const bankAccountsRoutes = require("./routes/api/v1/gen/bankAccounts");
const jobsRoutes = require("./routes/api/v1/gen/jobs");
const fileUploadRoutes = require("./routes/api/v1/gen/fileUpload");
const emailVerifications = require("./routes/api/v1/gen/emailVerifications");

app.use("/api/v1/gen/users", userRoutes);
app.use("/api/v1/gen/transactions", transactionRoutes);
app.use("/api/v1/gen/saving-goals", savingGoalsRoutes);
app.use("/api/v1/gen/categories", categoriesRoutes);
app.use("/api/v1/gen/bank-accounts", bankAccountsRoutes);
app.use("/api/v1/gen/jobs", jobsRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use("/api/v1/gen/file-upload", fileUploadRoutes);
app.use("/api/v1/gen/email-verifications", emailVerifications);
