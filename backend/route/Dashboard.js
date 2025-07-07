const express = require("express");
const router = express.Router();
const Dashboard = require("../controller/Dashboard");
router.route("/dashboard").get(Dashboard.DashboardDetails);
module.exports = router;
