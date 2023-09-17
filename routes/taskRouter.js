const { Router } = require("express");
const supabaseClient = require("../utils/db");

const taskRouter = Router();

taskRouter.post("/", async (req, res) => {
  console.log(req.body);
  req.body.status = "assigned";

  const { error, data } = await supabaseClient
    .from("users")
    .select("id", "role", "last_assigned_at")
    .eq("role", "pca")
    .order("last_assigned_at", { ascending: true })
    .limit(1);

  if (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
      status: false,
    });
  } else {
    console.log(data);
    const { error } = await supabaseClient
      .from("users")
      .update({
        last_assigned_at: new Date().toISOString(),
      })

      .eq("id", data[0].id);

    if (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: error,
        status: false,
      });
    } else {
      req.body.assigned_to_id = data[0].id;
      const { error } = await supabaseClient.from("tasks").insert([req.body]);

      if (error) {
        return res.status(500).json({
          message: "Something went wrong",
          error: error,
          status: false,
        });
      }
    }
  }

  return res.status(200).json({
    message: "Task Added Successfully",
    status: true,
  });
});

// TODO
taskRouter.get("/", async (req, res) => {
  const { error, data } = await supabaseClient.from("tasks").select();

  if (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
      status: false,
    });
  } else {
    return res.status(200).json({
      message: "Task List Fetched Successfully",
      tasks: data,
      status: true,
    });
  }
});

taskRouter.post("/accept", async (req, res) => {
  const { error } = await supabaseClient
    .from("tasks")
    .update({
      status: "accepted",
    })
    .eq("id", req.body.id);

  if (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
      status: false,
    });
  } else {
    return res.status(200).json({
      message: "Task Accepted Successfully",
      status: true,
    });
  }
});

module.exports = taskRouter;
