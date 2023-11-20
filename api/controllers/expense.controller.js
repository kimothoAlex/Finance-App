import Expense from "../models/expense.model.js";

export const addExpense = async (req, res, next) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(200).json("expense created successfully");
  } catch (error) {
    next(error);
  }
};
