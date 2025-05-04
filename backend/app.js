const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");

app.use(express.json());

const userRoutes = require("./routes/api/v1/gen/users");


app.use("/api/v1/gen/users", userRoutes);

app.listen (3000, ()=> {
    console.log ('Server is running on port 3000');
});