const express = require("express");

const app = express();

const { connectDB } = require("./config/database");

const {ValidateSignUpPage} = require("./utils/validation");

const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');


const User = require("./models/user");

app.use(express.json()); // express.json() => is middleware parse JSON object into Javascript object 
app.use(cookieParser()); // cookieParser is middleware parse to token and read it

app.post("/signup", async (req, res) => {
try{
// validation of user data

 ValidateSignUpPage(req);


 // Encrypt the password 
 const{firstName, lastName, emailId, password, skills} = req.body;

 const passwordHash = await bcrypt.hash(password, 10);

 console.log(passwordHash);

  const user = new User({
    firstName,
    lastName,
    emailId,
    password : passwordHash,
    skills
  });

  // Creating new instance of User model
  // get & post  function always return promise

  await user.save();
  res.send("User database successfully");
}
catch (err) {
  res.status(404).send("Error:" + err.message);
}
});

app.post("/login", async(req, res) =>{
  try{
     const {emailId, password} = req.body;

  const user = await User.findOne({emailId : emailId});

  if(!user){
    throw new Error("Invalid Credential");
  }

  /// check password authentication
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(isPasswordValid){
// create a JWT token

    const token = await jwt.sign({ _id : user._id}, "dev@123akas$&");

    res.cookie("token", token) /// send token back to user

    

// Add the token to cookie and send the response back to the user
    // res.cookie("token","dsgdhgiodgjgidfhsanasokifhchdsahi");

    res.send("Login successful!!!");
  }
  else{
    throw new Error("Invalid Credential");
  }
  } 
catch (err){
    res.status(400).send("Error : " + err.message );
}

// User Profile ---- API
app.get("/profile", async(req, res) => {
 
  try{

    const cookies = req.cookies;

    const {token} = cookies;

    if(!token){
      throw new Error("Invalid token");
    }

    const decodeMassege = await jwt.verify(token, "dev@123akas$&");

    const {_id} = decodeMassege;

    const user = await User.findById(_id);

    if(!user){
      throw new Error ("user does not exits");
    }
    else{
      res.send(user); 
    }
    
  }
  catch (err) {
    res.status(404).send("Error :"+ err.message);
  }

})

})
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
  } catch(err) {
    res.status(404).send("Something went wrong !!");
  }
});

/// API - Get all data of user from the database
app.get("/Feed", async (req, res) => {
  const user = await User.find({});
  try {
    res.send(user);
  } catch(err) {
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
