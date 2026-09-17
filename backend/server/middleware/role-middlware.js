function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        code: "AUTHORIZATION_REQUIRED",
        message: "Требуется авторизация",
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        code: "ACCESS_DENIED",
        message: "Недостаточно прав",
      });
    }
    next();
  };
}

module.exports = {
  roleMiddleware,
};
