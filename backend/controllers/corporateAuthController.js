const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Corporate = require("../models/Corporate");

const generateToken = (user, corporate) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      corporateId: corporate._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// REGISTER CORPORATE
exports.registerCorporate = async (req, res) => {
  try {
    const {
      companyName,
      industry,
      website,
      headquarters,
      csrFocusAreas,
      profile,
      email,
      password,
    } = req.body;

    if (!companyName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      role: "corporate",
    });

    const corporate = await Corporate.create({
      companyName,
      industry,
      website,
      headquarters,
      csrFocusAreas,
      profile,
      user: user._id,
    });

    const token = generateToken(user, corporate);

    return res.status(201).json({
      success: true,
      message: "Corporate account created successfully",
      token,

      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },

      corporate,
    });
  } catch (error) {
    console.error("Corporate Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// LOGIN CORPORATE
exports.loginCorporate = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
      role: "corporate",
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const corporate = await Corporate.findOne({
      user: user._id,
    });

    if (!corporate) {
      return res.status(404).json({
        success: false,
        message: "Corporate profile not found",
      });
    }

    const token = generateToken(user, corporate);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,

      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },

      corporate,
    });
  } catch (error) {
    console.error("Corporate Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// GET CURRENT CORPORATE PROFILE
exports.getCurrentCorporate = async (req, res) => {
  try {
    const corporate = await Corporate.findOne({
      user: req.user.userId,
    });

    if (!corporate) {
      return res.status(404).json({
        success: false,
        message: "Corporate profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      corporate,
    });
  } catch (error) {
    console.error("Get Corporate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};