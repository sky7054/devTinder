
const express = require('express');

const requestRouter = express.Router();

const {userAuth} = require('../middleware/auth');

requestRouter.get("/sendRequestConnection",userAuth, async(req,res) => {
      const user = req.user;

      res.send("Friend request sent by " + user.firstName);
});

module.exports = requestRouter;