const { Router } = require("express");

const pingRouter=Router();

pingRouter.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello world!" });
    }
);

module.exports=pingRouter;