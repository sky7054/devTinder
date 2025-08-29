const express = require("express");

const app = express();

const { connectDB } = require("./config/database");

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  // Creating new instance of User model
  // get & post  function always return promise

  await user.save();
  res.send("User database successfully");
});

/// API - Get user by email Id
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch {
    res.status.send("Something went wrong !!");
  }
});

/// API - Get all data of user from the database
app.get("/Feed", async (req, res) => {
  const user = await User.find({});
  try {
    res.send(user);
  } catch {
    res.status(404).send("Something went wrong");
  }
});

// API - Delete user data from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user data deleted successfully");
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

// API - Update data of User data
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    console.log(data);

    const ALLOWED_UPADATES = ["age", "gender", "PhotURL", "about", "skills"];

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

    console.log(user);
    res.send("user data updated successfully");
  } catch (err) {
    res.send("UPDATE FAILED:" + err.message);
  }
});

connectDB();
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7000, () => {
      console.log("Server is successfully listening on port 7000");
    });
  })
  .catch((err) => {
    console.log("database connection can't established");
  });
