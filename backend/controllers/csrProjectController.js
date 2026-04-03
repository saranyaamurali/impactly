const {
  filterPublicProjects,
  filterCsrInformationProjects,
  publicProjects,
} = require("../services/dataStore");

const getPublicProjects = (req, res) => {
  const { category, location, search, page, limit } = req.query;
  const data = filterPublicProjects({
    category,
    location,
    search,
    page,
    limit,
  });

  return res.status(200).json(data);
};

const getPublicProjectById = (req, res) => {
  const { id } = req.params;
  const project = publicProjects.find((item) => item.id === id);

  if (!project) {
    return res.status(404).json({ message: "CSR project not found" });
  }

  return res.status(200).json(project);
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
  getPublicProjects,
  getPublicProjectById,
  getCsrInformationProjects,
};