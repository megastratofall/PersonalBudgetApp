require("dotenv").config();
require("./config/db");
const colors = require("colors");
const express = require("express");
const cors = require("cors");
const transactionsRoutes = require("./routes/transactions");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/transactions", transactionsRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.yellow.bold);
});
