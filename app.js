const express = require("express");
const app = express();
require("express-async-errors");
require("dotenv").config();
console.log(process.env);
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");
const connectDB = require("./db/connectDB");
const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");
app.get("/", (req, res) => {
  res.send("ciao");
});
app.use(express.json());
app.use("/api/v1/", authRoute);
app.use("/api/v1/jobs", authMiddleware, jobsRoute);
app.use(errorHandler);

const url = process.env.MONGO_URI;
console.log(url);
const start = async () => {
  try {
    await connectDB(url);
    app.listen(3000, () => {
      console.log("is listening on 3000");
      // res.send("is listening on 3000");
    });
  } catch (error) {
    // console.log(error);
  }
};
start();
