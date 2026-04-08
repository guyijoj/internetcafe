const express = require("express");
const router = express.Router();

const restaurantsController = require("../controllers/restaurants.controller");
router.get("/", restaurantsController.getRestaurants);

module.exports = router;
