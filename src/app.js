const express = require('express');

const app = express();

app.use("/",(req,res) =>{
    res.send("hey! everyone")
})

app.use("/test", (req,res) => {
    res.send('Namaste dev');
})

app.use("/hello", (req,res) => {
    res.send("Hello from the server");
})

// app.use("/hello", (res,req) => {
//     res.send('Namaste dev');
// })

app.listen(7000,() =>{
    console.log('Server is successfully listening on port 7000');
});