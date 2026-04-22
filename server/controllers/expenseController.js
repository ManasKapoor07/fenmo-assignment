import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date, idempotencyKey } = req.body;

    if (!amount || !category || !date || !idempotencyKey) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (amount < 0) {
      return res.status(400).json({ message: "Amount cannot be negative" });
    }

    const existing = await Expense.findOne({ idempotencyKey });

    if (existing) {
      return res.status(200).json(existing); 
    }

    const expense = await Expense.create({
      amount,
      category,
      description,
      date,
      idempotencyKey,
    });

    return res.status(201).json(expense);
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      const existing = await Expense.findOne({
        idempotencyKey: req.body.idempotencyKey,
      });
      return res.status(200).json(existing);
    }

    res.status(500).json({ message: "Server error" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { category, sort } = req.query;

    let query = {};

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    let expensesQuery = Expense.find(query);

    if (sort === "desc") {
      expensesQuery = expensesQuery.sort({ date: -1 });
    } else if (sort === "asc") {
      expensesQuery = expensesQuery.sort({ date: 1 });
    }

    const expenses = await expensesQuery;

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};