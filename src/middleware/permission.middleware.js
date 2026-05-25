const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const userRole =
      req.user.role?.name;
      console.log('userRole: ', userRole);
        debugger
      if (!roles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied. Unauthorized role",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default authorizeRoles;