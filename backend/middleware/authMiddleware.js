const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'No authentication token provided',
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'impactly-dev-secret'
    );

    // Attach user info to request
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.ngoId = decoded.ngoId;
    req.corporateId = decoded.corporateId;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token has expired',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    return res.status(401).json({
      message: 'Authentication failed',
    });
  }
};

const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({
        message: 'User role not found',
      });
    }

    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        message: 'Insufficient permissions',
      });
    }

    next();
  };
};

// Export as both named and default exports for compatibility
module.exports = authMiddleware;
module.exports.authMiddleware = authMiddleware;
module.exports.roleMiddleware = roleMiddleware;

// Aliases for backward compatibility
module.exports.requireAuth = authMiddleware;
module.exports.requireCorporate = (req, res, next) => {
  authMiddleware(req, res, () => {
    roleMiddleware('corporate')(req, res, next);
  });
};
