const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./route");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors()); 


app.get("/ping", (req, res) => {
    res.send("pong");
});


app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
