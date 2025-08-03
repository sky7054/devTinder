const express = require('express');

const app = express();

const {connectDB} = require("./config/database");

const User = require("./models/user");

app.use(express.json());

// API - add user data in database 

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    // Creating new instance of User model
   // get & post  function always return promise

    await user.save();
    res.send("User database successfully");

});

/// API - Get user by email Id
app.get("/user", async (req, res) => {
    const userEmailId = req.body.emailId;

    try{
        console.log(userEmailId);
        const user = await User.find({emailId : userEmailId});
        if(!user){
            res.status(404).send("user not found");
        }
        else{
            res.send(user);
        }
    }
    catch(err) {
        res.status(404).send("Something went wrong !!");
    }
});


/// API - Get all data of user from the database
app.get("/Feed", async(req, res) => {
    const user = await User.find({});
    try{
        res.send(user);
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
});

// API - Delete user data from database
app.delete("/user", async (req, res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id : userId});
        res.send("user data deleted successfully");
    }
    catch(err){
        res.status(404).send("something went wrong");
    }
})

// API - Update data of User data
app.patch("/user", async (req, res) => {
    const userId = req.body._id;

    const data = req.body;

    try{
        console.log(data);
        const user = await User.findByIdAndUpdate({_id : userId}, data, {returnDocument :'before'});

        console.log(user);
        res.send("user data updated successfully");
    }
    catch (err) {
        res.send("something went wrong");
    }


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
