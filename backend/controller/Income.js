const prisma = require("../shortcut/prisma_initilization");
const date = require("../shortcut/returnDate");
const newIncome = async (req, res) => {
  const { source, salary } = req.body;
  try {
    if (!source && !salary) {
      return res.status(404).json({ message: "missing important field" });
    }
    const createIncome = await prisma.income.create({
      data: { source: source, salary: parseInt(salary), added_at: date() },
    });
    if (!createIncome) {
      console.log("Unable to create new Income");
      return res.status(502).json({ message: "Unable to create new Income" });
    }
    console.log("Successfully created new Income");
    return res.status(200).json({ message: "Successfully created new Income" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `${error.message}` });
  }
};
const allIncome = async (req, res) => {
  try {
    const getIncome = await prisma.income.findMany();
    if (!getIncome || getIncome.length === 0) {
      console.log("Sorry! no income's here");
      return res.status(404).json({ message: "Sorry! no income's here" });
    }
    console.log("Successfully got Income");
    return res
      .status(200)
      .json({ message: "Successfully got Income", income: getIncome });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `${error.message}` });
  }
};
const deleteIncome = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      res.status(404).json({ message: "missing important data" });
    }
    const deleteIncome = await prisma.income.delete({
      where: { id: id },
    });
    if (!deleteIncome) {
      console.log("Unable to delete this income");
      res.status(503).json({ message: "Unable to delete this income" });
    }
    console.log("Income deleted successfully");
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = { newIncome, allIncome, deleteIncome };
