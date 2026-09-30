const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const { authMiddleWare } = require("../middleware/auth-middleware");
const { roleMiddleware } = require("../middleware/role-middlware");
const { ROLES } = require("../schema/roles.schema");

router.post("/", orderController.createorder);

router.get(
  "/getOrders",
  authMiddleWare,
  roleMiddleware(...ROLES.KITCHEN),
  orderController.getorder,
);
module.exports = router;
