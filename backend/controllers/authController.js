const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Corporate = require("../models/Corporate");

const getJwtSecret = () => process.env.JWT_SECRET || "impactly-dev-secret";

const buildAuthResponse = ({ user, corporate }) => {
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
      corporateId: corporate._id.toString(),
    },
    getJwtSecret(),
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    corporate: {
      id: corporate._id.toString(),
      companyName: corporate.companyName,
      industry: corporate.industry,
      website: corporate.website,
      headquarters: corporate.headquarters,
      csrFocusAreas: corporate.csrFocusAreas,
      profile: corporate.profile,
    },
  };
};

const registerCorporate = async (req, res) => {
  try {
    const { email, password, companyName, industry, website, headquarters, profile } =
      req.body;

    if (!email || !password || !companyName) {
      return res.status(400).json({
        message: "email, password, and companyName are required",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "corporate",
    });

    const corporate = await Corporate.create({
      user: user._id,
      companyName: companyName.trim(),
      industry: industry || "",
      website: website || "",
      headquarters: headquarters || "",
      profile: profile || "",
      csrFocusAreas: [],
    });

    return res.status(201).json(buildAuthResponse({ user, corporate }));
  } catch (error) {
    return res.status(500).json({ message: "Unable to register corporate account" });
  }
};

const loginCorporate = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.role !== "corporate") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const corporate = await Corporate.findOne({ user: user._id });
    if (!corporate) {
      return res.status(404).json({ message: "Corporate profile not found" });
    }

    return res.status(200).json(buildAuthResponse({ user, corporate }));
  } catch (error) {
    return res.status(500).json({ message: "Unable to login" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      getJwtSecret(),
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to login admin" });
  }
};

module.exports = {
  registerCorporate,
  loginCorporate,
  loginAdmin,
};
