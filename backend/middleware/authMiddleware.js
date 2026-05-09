const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided',
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'impactly-dev-secret'
    );

    // Attach decoded user data to request
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.ngoId = decoded.ngoId || null;
    req.corporateId = decoded.corporateId || null;

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};


// Role-based middleware
const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({
        success: false,
        message: 'User role not found',
      });
    }

    const roles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    next();
  };
};


// Require authenticated user
const requireAuth = authMiddleware;


// Require corporate user
const requireCorporate = (req, res, next) => {
  authMiddleware(req, res, () => {
    roleMiddleware('corporate')(req, res, next);
  });
};


// Require NGO user
const requireNgo = (req, res, next) => {
  authMiddleware(req, res, () => {
    roleMiddleware('ngo')(req, res, next);
  });
};


// Require admin user
const requireAdmin = (req, res, next) => {
  authMiddleware(req, res, () => {
    roleMiddleware('admin')(req, res, next);
  });
};


// Exports
module.exports = authMiddleware;

module.exports.authMiddleware = authMiddleware;
module.exports.roleMiddleware = roleMiddleware;

module.exports.requireAuth = requireAuth;
module.exports.requireCorporate = requireCorporate;
module.exports.requireNgo = requireNgo;
module.exports.requireAdmin = requireAdmin;