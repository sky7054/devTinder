const express = require("express");

const app = express();

const { connectDB } = require("./config/database");

const authRouter = require('./routers/auth');
const profileRouter = require('./routers/profile');
const requestRouter = require('./routers/request');

const cookieParser = require('cookie-parser');

app.use(express.json()); // express.json() => is middleware parse JSON object into Javascript object 
app.use(cookieParser()); // cookieParser is middleware parse to token and read it

app.use("/",authRouter);

app.use("/",profileRouter);

app.use("/",requestRouter);

connectDB();
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7000, () => {
      console.log("Server is successfully listening on port 7000");
    });
  })
  .catch((err) => {
    console.log("database connection can not established");
  });
