const express = require("express");

const authRouter = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');

const {ValidateSignUpPage} = require('../utils/validation');



authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async(req, res) =>{
  try{
     const {emailId, password} = req.body;

  const user = await User.findOne({emailId : emailId});

  if(!user){
    throw new Error("Invalid Credential");
  }

  /// check password authentication
  const isPasswordValid = await user.validatePassword(password);

  if(isPasswordValid){
// create a JWT token

  const token = await user.getJWT();

    res.cookie("token", token, {
    expires: new Date(Date.now() + 101 * 3600000) // cookie will be removed after 8 hours
  }); /// send token back to user

    

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
});


module.exports = authRouter;
