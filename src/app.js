const express = require('express');

const app = express();

const {adminAuth, userAuth} = require("./middleware/auth");

// this will only handle GET call to/user 

    app.use("/admin", adminAuth);
    app.use("/user", userAuth);
     app.use("/",(err, req, res, next) =>{
        if(err){
            res.status(402).send("Something went wrong");
        }
    })
    
    app.get("/admin/getAllData", (req, res) =>{
        res.send("All data sent");
    });

    app.get("/admin/deleteUser", (req, res) =>{
        res.send("Deleted data");
    });

    app.get("/user/getAllData", (req,res) =>{
        res.send("sent all User data");
    });
    app.get("/user/deleteProfile", (req, res) =>{
        res.send("deleted user data");
    });

      app.get("/getUserData", (res, req)=>{
        res.send("user sent all data");
        })

    app.use("/", (err, req, res, next) =>{
        if(err){
            res.status(501).send("Something went Wrong");
        }
    })


app.listen(7000,() =>{
    console.log('Server is successfully listening on port 7000');
});