const {
  filterCsrInformationProjects,
  publicProjects,
} = require("../services/dataStore");
const Corporate = require("../models/Corporate");
const CSRProject = require("../models/CSRProject");

const parseList = (value) => {
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

const serializeProject = (project) => ({
  id: project._id.toString(),
  title: project.title,
  category: project.category,
  budget: project.budget,
  location: project.location,
  timeline: project.timeline,
  status: project.status,
  companySponsor: project.companySponsor,
  implementingPartner: project.implementingPartner,
  beneficiaries: project.beneficiaries,
  districts: project.districts,
  progressPercent: project.progressPercent,
  officialWebsite: project.officialWebsite,
  sourceWebsite: project.sourceWebsite,
  description: project.description,
  impactIdea: project.impactIdea,
  sdgFocus: project.sdgFocus,
  expectedOutcomes: project.expectedOutcomes,
});

const getPublicProjects = async (req, res) => {
  try {
    const { category, location, search, page = 1, limit = 10 } = req.query;
    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.max(Number(limit) || 10, 1);

    const query = {
      visibility: "public",
    };

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { impactIdea: { $regex: search, $options: "i" } },
      ];
    }

    const [items, total] = await Promise.all([
      CSRProject.find(query)
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit),
      CSRProject.countDocuments(query),
    ]);

    return res.status(200).json({
      items: items.map(serializeProject),
      pagination: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load public CSR projects" });
  }
};

const getPublicProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await CSRProject.findById(id);

    if (project) {
      return res.status(200).json(serializeProject(project));
    }

    const fallbackProject = publicProjects.find((item) => item.id === id);
    if (!fallbackProject) {
      return res.status(404).json({ message: "CSR project not found" });
    }

    return res.status(200).json(fallbackProject);
  } catch (error) {
    return res.status(500).json({ message: "Unable to load CSR project" });
  }
};

const createCsrProject = async (req, res) => {
  try {
    const corporate = await Corporate.findOne({ user: req.userId });

    if (!corporate) {
      return res.status(404).json({ message: "Corporate profile not found" });
    }

    const {
      title,
      category,
      budget,
      location,
      timeline,
      status,
      implementingPartner,
      beneficiaries,
      districts,
      progressPercent,
      officialWebsite,
      sourceWebsite,
      description,
      impactIdea,
      sdgFocus,
      expectedOutcomes,
    } = req.body;

    if (!title || !category || !location) {
      return res.status(400).json({
        message: "title, category, and location are required",
      });
    }

    const project = await CSRProject.create({
      corporate: corporate._id,
      title: String(title).trim(),
      category: String(category).trim(),
      budget: Number(budget) || 0,
      location: String(location).trim(),
      timeline: timeline ? String(timeline).trim() : "",
      status: status || "pending",
      companySponsor: corporate.companyName,
      implementingPartner: implementingPartner ? String(implementingPartner).trim() : "",
      beneficiaries: Number(beneficiaries) || 0,
      districts: parseList(districts),
      progressPercent: Number(progressPercent) || 0,
      officialWebsite: officialWebsite ? String(officialWebsite).trim() : "",
      sourceWebsite: sourceWebsite ? String(sourceWebsite).trim() : "",
      description: description ? String(description).trim() : "",
      impactIdea: impactIdea ? String(impactIdea).trim() : "",
      sdgFocus: parseList(sdgFocus),
      expectedOutcomes: parseList(expectedOutcomes),
      visibility: "public",
    });

    return res.status(201).json(serializeProject(project));
  } catch (error) {
    return res.status(500).json({ message: "Unable to create CSR project" });
  }
};

const getMyProjects = async (req, res) => {
  try {
    const corporate = await Corporate.findOne({ user: req.userId });

    if (!corporate) {
      return res.status(404).json({ message: "Corporate profile not found" });
    }

    const projects = await CSRProject.find({ corporate: corporate._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      items: projects.map(serializeProject),
      total: projects.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load corporate CSR projects" });
  }
};

const getCsrInformationProjects = (req, res) => {
  const { category, organization, search, page, limit } = req.query;
  const data = filterCsrInformationProjects({
    category,
    organization,
    search,
    page,
    limit,
  });

  return res.status(200).json(data);
};

module.exports = {
  createCsrProject,
  getMyProjects,
  getPublicProjects,
  getPublicProjectById,
  getCsrInformationProjects,
};