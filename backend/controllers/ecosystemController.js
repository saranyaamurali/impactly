const {
  filterCompanies,
  filterNgos,
  filterNgoInformationEntries,
} = require("../services/dataStore");

const getCompanies = (req, res) => {
  const { focus, region } = req.query;
  const companies = filterCompanies({ focus, region });

  return res.status(200).json({
    items: companies,
    total: companies.length,
  });
};

const getNgos = (req, res) => {
  const { focus, region } = req.query;
  const ngos = filterNgos({ focus, region });

  return res.status(200).json({
    items: ngos,
    total: ngos.length,
  });
};

const getNgoInformationEntries = (req, res) => {
  const { focus, region, search, page, limit } = req.query;
  const data = filterNgoInformationEntries({
    focus,
    region,
    search,
    page,
    limit,
  });

  return res.status(200).json(data);
};

module.exports = {
  getCompanies,
  getNgos,
  getNgoInformationEntries,
};