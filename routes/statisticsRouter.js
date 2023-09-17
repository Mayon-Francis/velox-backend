const { Router } = require("express");
const supabaseClient = require("../utils/db");

const statisticsRouter = Router();

statisticsRouter.get("/", async (req, res) => {
  let totalTasks = await supabaseClient
    .from("tasks")
    .select("*");

  let totalTasksCount = totalTasks.data.length;

  let percentCompletedTasks = await supabaseClient
    .from("tasks")
    .select("*")
    .eq("status", "completed");

  let percentage = Math.round((percentCompletedTasks.data.length / totalTasksCount) * 100)

  let totalEmployees = await supabaseClient.from("users").select("*");

  let totalEmployeesCount = totalEmployees.data.length;

  let totalUrgentTasks = await supabaseClient
    .from("tasks")
    .select("*")
    .eq("priority", "high");

  let totalUrgentTasksCount = totalUrgentTasks.data.length;

  return res.status(200).json({
    message: "Statistics Fetched Successfully",
    totalTasksCount: totalTasksCount,
    percentCompletedTasks: percentage,
    totalEmployeesCount: totalEmployeesCount,
    totalUrgentTasksCount: totalUrgentTasksCount,
    status: true,
  });
});

module.exports = statisticsRouter;
