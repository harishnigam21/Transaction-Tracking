const express = require("express");
const router = express.Router();
const Income = require("../controller/Income");
router
  .route("/income")
  .post(Income.newIncome)
  .get(Income.allIncome)
  .delete(Income.deleteIncome);
module.exports = router;
