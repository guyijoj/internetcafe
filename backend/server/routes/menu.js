const express = require("express");
const router = express.Router();
const pool = require("../db");
const menuContorller  = require("../controllers/menu.controller")

router.get("/", menuContorller.getMenu);

module.exports = router;