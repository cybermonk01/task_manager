require("dotenv").config("./.env");

const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const connectDB = require("./db/index.js");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

connectDB();
app.use("/", (req, res) =>
  res.json({
    success: "true",
    message: "success",
  })
);
app.use("/auth", authRoutes);
app.use("/task", taskRouter);

// localhost:4000/auth/register

const port = 4000;

app.listen(port, () => {
  console.log(`server is running on port`, port);
});
