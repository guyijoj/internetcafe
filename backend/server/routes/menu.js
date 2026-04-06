const express = require("express");
const router = express.Router();

const menuContorller  = require("../controllers/menu.controller")

router.get("/", menuContorller.getMenu);

module.exports = router;