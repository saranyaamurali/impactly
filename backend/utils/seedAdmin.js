const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ensureAdminUser = async () => {
  const email = (process.env.ADMIN_EMAIL || "admin@impactly.com").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "admin";

  const existing = await User.findOne({ email, role: "admin" });
  if (existing) {
    return existing;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    email,
    password: hashedPassword,
    role: "admin",
  });
};

module.exports = {
  ensureAdminUser,
};
