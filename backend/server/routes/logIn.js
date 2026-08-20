const express = require("express");
const router = express.Router();

const logInController = require("../controllers/logIn.controllers");
router.post("/login", logInController.postAuth);

module.exports = router;
