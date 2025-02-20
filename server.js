const express = require("express")
const app = express();
require("dotenv").config();
const Mongoose = require("mongoose");
const PORT = 3001;

app.get("/ping", (req, res)=>{
    res.send("pong")
});

const MONGO_URI = process.env.uri;
Mongoose.connect(MONGO_URI)
.then(()=> console.log("Database connected successfully"))
.catch((err)=>{
    console.log("Error found:",err)
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})