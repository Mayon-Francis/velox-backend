const { Router } = require("express");
const supabaseClient = require("../utils/db");

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
    console.log(req.body);
    const { data, error } = await supabaseClient
        .from('users')
        .select()
        .eq('email', req.body.email);

    if (data.length === 0) {
        await supabaseClient
            .from('users')
            .insert([
                req.body
            ]);
    } else if (data[0].role !== req.body.role) {
        return res.status(400).json({ message: "Wrong Role" });
    }

    return res.status(200).json({
        message: "Login Success",
        id: data[0].id,
        status: true
    });
}
);

module.exports = userRouter;