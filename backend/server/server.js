require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API works");
});

const menuRoutes = require("./routes/menu");
app.use("/api/menu", menuRoutes);

const categoriesRoutes = require("./routes/categories");
app.use("/api/categories", categoriesRoutes);

const orderRoutes = require("./routes/order");
app.use("/api/order", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log("SERVER IS RUNNING ON PORT", process.env.PORT);
});

const restaurantRoutes = require("./routes/restaurants");
app.use("/api/restaurants", restaurantRoutes);
