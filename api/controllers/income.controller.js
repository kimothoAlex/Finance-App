import Income from "../models/income.model.js";

export const addIncome = async (req, res, next) => {
  try {
    const newIncome = new Income(req.body);
    await newIncome.save();
    res.status(200).json("Income created successfully");
  } catch (error) {
    next(error);
  }
};

export const getIncome = async (req, res, next) => {
  try {
    const incomes = await Income.find({ userRef: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    next(error);
  }
};

export const deleteIncome = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Income.findByIdAndDelete(id);
    res.status(200).json("Income deleted successfully");
  } catch (error) {
    next(error);
  }
};
