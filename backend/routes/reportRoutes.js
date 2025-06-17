const express = require("express");
const {protect, adminOnly} = require("../middlewares/authMiddleware");
const {exportTasksReport, exportUsersReport} = require("../controllers/reportContoller");

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTasksReport); //export all tasks as excel/pdf
router.get("/export/users", protect, adminOnly, exportUsersReport); //export user-task report

module.exports = router;