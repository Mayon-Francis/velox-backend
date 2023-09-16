const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pingRouter = require("./routes/pingRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello world!" });
});

app.use("/api", pingRouter);

app.use(cors());
app.use(bodyParser.json());
