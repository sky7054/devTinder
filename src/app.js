const express = require('express');

const app = express();

const {connectDB} = require("./config/database");

const User = require("./models/user");

app.post("/signup", async (req, res)=> {
     const user = new User({
        firstName : "Suresh",
        lastName : "Raina",
        emailId : "sureshraina@gmail.com",
        password : "sureshraina@123",
    });

    // Creating new instance of User model
   

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
