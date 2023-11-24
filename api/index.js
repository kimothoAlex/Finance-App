import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import expenseRoute from "./routes/expense.route.js";
import incomeRoute from "./routes/income.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected successfully to DB");
  })
  .catch((err) => {
    console.log(`An error occured ${err}`);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/auth", authRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/income", incomeRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server side error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
