require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const supabaseClient = require("./utils/db");
const pingRouter = require("./routes/pingRouter");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const statisticsRouter = require("./routes/statisticsRouter");
const { app, io, server } = require("./utils/init");

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
    app.use("/task", taskRouter);
    app.use("/statistics", statisticsRouter);

    io.on('connection', (socket) => {
      console.log('a socket user connected');
      socket.on('disconnect', function () {
        console.log('a socket user connected');
      });
    });

    server.listen(PORT);
    console.log(`Server is running on port ${PORT}`);


  } catch (error) {
    console.log(error);
  }
}

main();

