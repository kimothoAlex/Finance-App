import express from "express";
import {
  addExpense,
  getExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const route = express.Router();

route.post("/add-expense", verifyUser, addExpense);
route.get("/get-expense", verifyUser, getExpense);
route.delete("/delete-expense/:id", verifyUser, deleteExpense);
export default route;
