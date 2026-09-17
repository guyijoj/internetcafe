const express = require("express");
const router = express.Router();

const { ROLES } = require("../schema/roles.schema");
const logInController = require("../controllers/logIn.controllers");
const refreshController = require("../controllers/refresh.controller");
const logOutController = require("../controllers/logOut.controller");
const { authMiddleWare } = require("../middleware/auth-middleware");
const { roleMiddleware } = require("../middleware/role-middlware");

router.post("/login", logInController.postAuth);

router.get(
  "/staff-check",
  authMiddleWare,
  roleMiddleware(...Object.values(ROLES).flat()),
  (req, res) => {
    return res.json({
      success: true,
      userInfo: req.user,
    });
  },
);

router.post("/refresh", refreshController.refresh);
router.post("/logout", logOutController.logOutAuth);

module.exports = router;
