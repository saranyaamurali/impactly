const jwt = require("jsonwebtoken");

const getJwtSecret = () => process.env.JWT_SECRET || "impactly-dev-secret";

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.userId = payload.sub;
    req.userRole = payload.role;
    req.corporateId = payload.corporateId;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireCorporate = (req, res, next) => {
  if (req.userRole !== "corporate") {
    return res.status(403).json({ message: "Corporate access required" });
  }

  return next();
};

module.exports = {
  requireAuth,
  requireCorporate,
};
