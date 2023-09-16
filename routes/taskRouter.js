const { Router } = require("express");
const supabaseClient = require("../utils/db");

const taskRouter = Router();

taskRouter.post("/", async (req, res) => {
    console.log(req.body);
    const { error } = await supabaseClient
        .from('tasks')
        .insert([
            req.body
        ]);

    if (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error,
            status: false
        });
    }
    else {
        return res.status(200).json({
            message: "Task Added Successfully",
            status: true
        });

    }
}
);

// TODO
taskRouter.get("/", async (req, res) => {
    const { error, data } = await supabaseClient
        .from('tasks')
        .select();

    if (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error,
            status: false
        });
    }
    else {
        return res.status(200).json({
            message: "Task List Fetched Successfully",
            tasks: data,
            status: true
        });

    }
}
);

module.exports = taskRouter;