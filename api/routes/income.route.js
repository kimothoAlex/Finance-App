import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  addIncome,
  deleteIncome,
  getIncome,
} from "../controllers/income.controller.js";

const route = express.Router();

route.post("/add-income", verifyUser, addIncome);
route.get("/get-Income", verifyUser, getIncome);
route.delete("/delete-income/:id", verifyUser, deleteIncome);
export default route;
