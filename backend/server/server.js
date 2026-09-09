require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
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

const logInRoutes = require("./routes/logIn");
app.use("/api/auth", logInRoutes);

app.listen(process.env.PORT, () => {
  console.log("SERVER IS RUNNING ON PORT", process.env.PORT);
});

const restaurantRoutes = require("./routes/restaurants");
app.use("/api/restaurants", restaurantRoutes);
