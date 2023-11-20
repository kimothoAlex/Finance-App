import express from "express";
import { addExpense } from "../controllers/expense.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const route = express.Router();

route.post("/add-expense", verifyUser, addExpense);

export default route;
