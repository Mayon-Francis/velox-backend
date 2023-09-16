require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const supabaseClient = require("./utils/db");
const pingRouter = require("./routes/pingRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function main() {
  try {
    app.get("/", (req, res) => {
      return res.status(200).json({ message: "Hello world!" });
    });

    app.use("/ping", pingRouter);
    app.use("/user", userRouter);

    app.listen(PORT, () => {
      console.log("Server is running on port 3000");
    });


  } catch (error) {
    console.log(error);
  }
}

main();

