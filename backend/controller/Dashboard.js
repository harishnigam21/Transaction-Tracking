const prisma = require("../shortcut/prisma_initilization");
const DashboardDetails = async (req, res) => {
  function sortByDateTime(data, dateKey) {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const dateAString = a[dateKey];
      const dateBString = b[dateKey];
      const parseDateTime = (dateTimeStr) => {
        const [datePart, timePart] = dateTimeStr.split(" ");
        const [day, month, year] = datePart.split("-");
        const [hours, minutes, seconds] = timePart.split(":");
        return new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes),
          parseInt(seconds)
        );
      };

      const dateA = parseDateTime(dateAString);
      const dateB = parseDateTime(dateBString);
      return dateA.getTime() - dateB.getTime();
    });

    return sortedData;
  }
  try {
    const getIncome = await prisma.income.findMany();
    const getExpense = await prisma.expense.findMany();
    if (getIncome.length === 0 && getExpense.length > 0) {
      return res.status(401).json({
        message:
          "You have no income and more expenses.Hence your account is in negative. ",
      });
    } else if (getIncome.length === 0 && getExpense.length === 0) {
      return res.statu(400).json({
        message: "Please add your Income and Expenses at their respective page",
      });
    }
    
    let total_income = 0;
    for (let i = 0; i < getIncome.length; i++) {
      total_income += getIncome[i].salary;
    }

    let total_expense = 0;
    for (let i = 0; i < getExpense.length; i++) {
      total_expense += getExpense[i].amount;
    }

    let balance_remaining = total_income - total_expense;

    const allTransaction = [...getIncome, ...getExpense];
    const sortesAllTransaction = sortByDateTime(allTransaction, "added_at");
    const detailObj = {
      totalIncome: total_income,
      totalExpense: total_expense,
      totalBalance: balance_remaining,
      incomList: getIncome,
      expenseList: getExpense,
      transactionList: sortesAllTransaction,
    };
    console.log("Successfully got dashboard detail");
    return res
      .status(200)
      .json({ message: "Successfully got dashboard detail", data: detailObj });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { DashboardDetails };
