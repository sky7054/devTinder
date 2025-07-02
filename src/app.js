const express = require('express');

const app = express();


// this will only handle GET call to/user 
app.get(
    "/user",
    (req,  res, next) =>{
        console.log("Handling the router user");
        // res.send("Response!");
        next();
},
(req, res, next) =>{
    console.log("Handling the router user 2");
    // res.send("2nd Response!");
    next();
},
(req, res, next) =>{
    console.log("Handling the router user 3");
    // res.send("3rd Response!");
    next();
},
(req, res, next) =>{
    console.log("Handling the router user 4");
    // res.send("4th response!");
    next();
},
(req, res, next) =>{
    console.log("Handling the router user 5");
    res.send("5th response!");
});



app.listen(7000,() =>{
    console.log('Server is successfully listening on port 7000');
});