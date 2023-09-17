const { Router } = require("express");
const supabaseClient = require("../utils/db");

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
    console.log(req.body);
    req.body.role = req.body.role? req.body.role.toLowerCase() : undefined;

    let { data, error } = await supabaseClient
        .from('users')
        .select()
        .eq('email', req.body.email);

    if (data.length === 0) {
        const { data, error } = await supabaseClient
            .from('users')
            .insert([
                req.body
            ])
            .select("id");

        if (error) {
            return res.status(500).json({
                message: "Something went wrong",
                error: error,
                status: false,
            });
        }

        return res.status(200).json({
            message: "Login Success",
            id: data[0].id,
            status: true
        });
    } else if (data[0].role !== req.body.role) {
        return res.status(400).json({ message: "Wrong Role" });
    } else {
        return res.status(200).json({
            message: "Login Success",
            id: data[0].id,
            role: data[0].role,
            email: data[0].email,
            status: true
        });
    }


}
);

module.exports = userRouter;