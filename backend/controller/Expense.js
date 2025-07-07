const prisma = require("../shortcut/prisma_initilization");
const date = require("../shortcut/returnDate");
const newExpense = async (req, res) => {
  const { to, amount } = req.body;
  try {
    if (!to && !amount) {
      return res.status(404).json({ message: "missing important field" });
    }
    const createExpense = await prisma.expense.create({
      data: { to: to, amount: parseInt(amount), added_at: date() },
    });
    if (!createExpense) {
      console.log("Unable to create new Expense");
      return res.status(502).json({ message: "Unable to create new Expense" });
    }
    console.log("Successfully created new Expense");
    return res
      .status(200)
      .json({ message: "Successfully created new Expense" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `${error.message}` });
  }
};
const allExpense = async (req, res) => {
  try {
    const getExpense = await prisma.expense.findMany();
    if (!getExpense || getExpense.length === 0) {
      console.log("Sorry! no expenses's here");
      return res.status(404).json({ message: "Sorry! no expenses's here" });
    }
    console.log("Successfully got Expenses");
    return res
      .status(200)
      .json({ message: "Successfully got Expenses", expense: getExpense });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `${error.message}` });
  }
};

module.exports = { newExpense, allExpense };
