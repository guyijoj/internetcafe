const express = require("express");
const router = express.Router();

const logInController = require("../controllers/logIn.controllers");
const { authMiddleWare } = require("../middleware/auth-middleware");
const { roleMiddleware } = require("../middleware/role-middlware");

router.post("/login", logInController.postAuth);
router.get(
  "/admin-check",
  authMiddleWare,
  roleMiddleware("admin", "admin_primary"),
  (req, res) => {
    return res.json({
      success: true,
      userInfo: req.user,
    });
  },
);

module.exports = router;
