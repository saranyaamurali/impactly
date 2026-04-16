const User = require("../models/User");
const Corporate = require("../models/Corporate");

const normalizeList = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getCorporateMe = async (req, res) => {
  try {
    const [user, corporate] = await Promise.all([
      User.findById(req.userId),
      Corporate.findOne({ user: req.userId }),
    ]);

    if (!user || !corporate) {
      return res.status(404).json({ message: "Corporate profile not found" });
    }

    return res.status(200).json({
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
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load corporate profile" });
  }
};

const updateCorporateMe = async (req, res) => {
  try {
    const corporate = await Corporate.findOne({ user: req.userId });

    if (!corporate) {
      return res.status(404).json({ message: "Corporate profile not found" });
    }

    const {
      companyName,
      industry,
      website,
      headquarters,
      profile,
      csrFocusAreas,
    } = req.body;

    if (typeof companyName === "string" && companyName.trim()) {
      corporate.companyName = companyName.trim();
    }

    if (typeof industry === "string") {
      corporate.industry = industry.trim();
    }

    if (typeof website === "string") {
      corporate.website = website.trim();
    }

    if (typeof headquarters === "string") {
      corporate.headquarters = headquarters.trim();
    }

    if (typeof profile === "string") {
      corporate.profile = profile.trim();
    }

    if (typeof csrFocusAreas !== "undefined") {
      corporate.csrFocusAreas = normalizeList(csrFocusAreas);
    }

    await corporate.save();

    return res.status(200).json({
      corporate: {
        id: corporate._id.toString(),
        companyName: corporate.companyName,
        industry: corporate.industry,
        website: corporate.website,
        headquarters: corporate.headquarters,
        csrFocusAreas: corporate.csrFocusAreas,
        profile: corporate.profile,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update corporate profile" });
  }
};

module.exports = {
  getCorporateMe,
  updateCorporateMe,
};
