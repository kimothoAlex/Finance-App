import Expense from "../models/expense.model.js";

export const addExpense = async (req, res, next) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(200).json("Expense created successfully");
  } catch (error) {
    next(error);
  }
};

export const getExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userRef: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json("Expense deleted successfully");
  } catch (error) {
    next(error);
  }
};
