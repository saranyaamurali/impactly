const express = require("express");
const {
	getCompanies,
	getNgos,
	getCompanyInformationEntries,
	getNgoInformationEntries,
} = require("../controllers/ecosystemController");

const router = express.Router();

router.get("/companies", getCompanies);
router.get("/ngos", getNgos);
router.get("/companies-information", getCompanyInformationEntries);
router.get("/ngos-information", getNgoInformationEntries);

module.exports = router;