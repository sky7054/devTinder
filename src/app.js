const express = require('express');

const app = express();

const {connectDB} = require("./config/database");

const User = require("./models/user");

app.use(express.json())

app.post("/signup", async (req, res)=> {
    const user = new User(req.body);

    // Creating new instance of User model
   // get & post  function always return promise

    await user.save();
    res.send("User database successfully");

});


connectDB();
connectDB().then(() =>{
    console.log("Database connection established");
    app.listen(7000,() => {
    console.log("Server is successfully listening on port 7000");
})
})
.catch((err) => {
    console.log("database connection can't established");
})
