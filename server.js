const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

module.exports = app;

const connectDb = require("./db");
require("dotenv").config();
connectDb();

const userRouter = require("./routes/user");
app.use("/api", userRouter);

const authRouter = require("./routes/auth");
app.use("/api", authRouter);

const postRouter = require("./routes/post");
app.use("/api", postRouter);
