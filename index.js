require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const supabaseClient = require("./utils/db");
const pingRouter = require("./routes/pingRouter");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', () => { /* … */ });


async function main() {
  try {
    app.get("/", (req, res) => {
      return res.status(200).json({ message: "Hello world!" });
    });

    app.use("/ping", pingRouter);
    app.use("/user", userRouter);
    app.use("/task", taskRouter);

    server.listen(PORT);
    console.log(`Server is running on port ${PORT}`);


  } catch (error) {
    console.log(error);
  }
}

main();

