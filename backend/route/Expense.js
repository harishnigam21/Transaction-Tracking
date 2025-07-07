const express = require("express");
const router = express.Router();
const Expense = require("../controller/Expense");
router.route("/expense").post(Expense.newExpense).get(Expense.allExpense);
module.exports = router;
