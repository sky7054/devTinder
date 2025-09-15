
const express = require('express');

const profileRouter = express.Router();

const {userAuth} = require('../middleware/auth');

const {validateProfileEditData} = require('../utils/validation');

// User Profile ---- API
profileRouter.get("/profile/view",userAuth, async(req, res) => {

  try{
    const user = req.user;

    res.send(user);
  }catch(err){
    res.status(404).send("Error :"+ err.message)
  }
});

profileRouter.patch("/profile/edit",userAuth, async(req, res) =>{
    
  try{
       if(!validateProfileEditData(req)){
      throw new Error ("Invalid edit Request");
    }
    
    const loggedInUser = req.user;


    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    loggedInUser.save();

    res.json({
      message : `${loggedInUser.firstName}, your profile successfully updated`,
      data : loggedInUser
  })
  }
  catch (err) {
    res.status(404).send("Error :" + err.message);
  }
});


module.exports = profileRouter;