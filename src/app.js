const express = require('express');

const app = express();


// this will only handle GET call to/user 
app.get("/user",(req,res) =>{
    res.send("Get the successfully data of user")
});

app.post("/user",(req,res) =>{
    res.send("Post the successfully data from server")
})

app.delete("/user",(req,res) =>{
    res.send("deleted successfully");
})

// this will match all the HTTP method API calls to /test
app.use("/hello/2",(req,res) =>{
    res.send("abracadabra");
})

app.use("/hello", (req,res) => {
    res.send("Hello from the server");
})

app.use("/test", (req,res) => {
    res.send('Namaste NodeJs test is start');
})

// app.use("/",(req,res) =>{
//     res.send("hey! everyone")
// })

app.listen(7000,() =>{
    console.log('Server is successfully listening on port 7000');
});