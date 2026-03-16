require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API works")
})

const menuRoutes = require("./routes/menu");
app.use("/api/menu", menuRoutes);


app.listen(process.env.PORT, ()=> {
    console.log("SERVER IS RUNNING ON PORT", process.env.PORT)
})

