
const express = require('express');

const profileRouter = express.Router();

const {userAuth} = require('../middleware/auth')

// User Profile ---- API
profileRouter.get("/profile",userAuth, async(req, res) => {

  try{
    const user = req.user;

    res.send(user);
  }catch(err){
    res.status(404).send("Error :"+ err.message)
  }
});

// API - Update data of User data
profileRouter.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {

    const ALLOWED_UPADATES = ["age", "gender", "photURL", "about", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPADATES.includes(k));
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if(data?.skills.length > 10){
        throw new Error("skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });

    res.send("user data updated successfully");
  } catch (err) {
    res.send("UPDATE FAILED:" + err.message);
  }
});


/// API - Get user by email Id
profileRouter.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch(err) {
    res.status(404).send("Something went wrong !!");
  }
});

/// API - Get all data of user from the database
profileRouter.get("/Feed", async (req, res) => {
  const user = await User.find({});
  try {
    res.send(user);
  } catch(err) {
    res.status(404).send("Something went wrong");
  }
});

// API - Delete user data from database
profileRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user data deleted successfully");
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

module.exports = profileRouter;