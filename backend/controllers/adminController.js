const CSRProject = require("../models/CSRProject");
const Partnership = require("../models/Partnership");
const NGO = require("../models/NGO");

const getPendingProjects = async (req, res) => {
  try {
    const projects = await CSRProject.find({ approvalStatus: "pending" })
      .sort({ createdAt: -1 })
      .populate("corporate", "companyName");

    return res.status(200).json({
      items: projects,
      total: projects.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load pending projects" });
  }
};

const approveProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await CSRProject.findByIdAndUpdate(
      id,
      {
        approvalStatus: "approved",
        approvedBy: req.userId,
        approvedAt: new Date(),
        rejectionReason: "",
        visibility: "public",
        status: "active",
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: "Unable to approve project" });
  }
};

const rejectProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const project = await CSRProject.findByIdAndUpdate(
      id,
      {
        approvalStatus: "rejected",
        approvedBy: req.userId,
        approvedAt: new Date(),
        rejectionReason: rejectionReason || "",
        visibility: "private",
        status: "pending",
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: "Unable to reject project" });
  }
};

const getPendingPartnerships = async (req, res) => {
  try {
    const partnerships = await Partnership.find({ approvalStatus: "pending" })
      .sort({ createdAt: -1 })
      .populate("ngoId", "ngoName")
      .populate("corporateId", "companyName")
      .populate("projectId", "title");

    return res.status(200).json({
      items: partnerships,
      total: partnerships.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load pending partnerships" });
  }
};

const approvePartnership = async (req, res) => {
  try {
    const { id } = req.params;

    const partnership = await Partnership.findByIdAndUpdate(
      id,
      {
        approvalStatus: "approved",
        approvedBy: req.userId,
        approvedAt: new Date(),
        rejectionReason: "",
        status: "accepted",
        allocatedBudget: 0,
      },
      { new: true }
    );

    if (!partnership) {
      return res.status(404).json({ message: "Partnership not found" });
    }

    return res.status(200).json(partnership);
  } catch (error) {
    return res.status(500).json({ message: "Unable to approve partnership" });
  }
};

const rejectPartnership = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const partnership = await Partnership.findByIdAndUpdate(
      id,
      {
        approvalStatus: "rejected",
        approvedBy: req.userId,
        approvedAt: new Date(),
        rejectionReason: rejectionReason || "",
        status: "rejected",
      },
      { new: true }
    );

    if (!partnership) {
      return res.status(404).json({ message: "Partnership not found" });
    }

    return res.status(200).json(partnership);
  } catch (error) {
    return res.status(500).json({ message: "Unable to reject partnership" });
  }
};

const getPendingNgos = async (req, res) => {
  try {
    const ngos = await NGO.find({ verificationStatus: "pending" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      items: ngos,
      total: ngos.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load pending NGOs" });
  }
};

const verifyNgo = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findByIdAndUpdate(
      id,
      { verificationStatus: "verified" },
      { new: true }
    );
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    return res.status(200).json(ngo);
  } catch (error) {
    return res.status(500).json({ message: "Unable to verify NGO" });
  }
};

const rejectNgo = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findByIdAndUpdate(
      id,
      { verificationStatus: "rejected" },
      { new: true }
    );
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    return res.status(200).json(ngo);
  } catch (error) {
    return res.status(500).json({ message: "Unable to reject NGO" });
  }
};

module.exports = {
  getPendingProjects,
  approveProject,
  rejectProject,
  getPendingPartnerships,
  approvePartnership,
  rejectPartnership,
  getPendingNgos,
  verifyNgo,
  rejectNgo,
};
