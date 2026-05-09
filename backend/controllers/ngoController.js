const NGO = require('../models/NGO');
const Partnership = require('../models/Partnership');
const ImpactUpdate = require('../models/ImpactUpdate');
const CSRProject = require('../models/CSRProject');

const ngoController = {
  // Get NGO Profile
  getNgoProfile: async (req, res) => {
    try {
      const userId = req.userId;

      const ngo = await NGO.findOne({ userId });
      if (!ngo) {
        return res.status(404).json({ message: 'NGO profile not found' });
      }

      res.json({
        message: 'NGO profile fetched successfully',
        ngo,
      });
    } catch (error) {
      console.error('Get NGO profile error:', error);
      res.status(500).json({ message: 'Failed to fetch NGO profile' });
    }
  },

  // Update NGO Profile
  updateNgoProfile: async (req, res) => {
    try {
      const userId = req.userId;
      const { ngoName, mission, website, focusAreas, contactPerson, phone, about, teamSize } = req.body;

      const ngo = await NGO.findOne({ userId });
      if (!ngo) {
        return res.status(404).json({ message: 'NGO profile not found' });
      }

      // Update fields
      if (ngoName) ngo.ngoName = ngoName;
      if (mission) ngo.mission = mission;
      if (website) ngo.website = website;
      if (focusAreas) ngo.focusAreas = focusAreas;
      if (contactPerson) ngo.contactPerson = contactPerson;
      if (phone) ngo.phone = phone;
      if (about) ngo.about = about;
      if (teamSize) ngo.teamSize = teamSize;

      await ngo.save();

      res.json({
        message: 'NGO profile updated successfully',
        ngo,
      });
    } catch (error) {
      console.error('Update NGO profile error:', error);
      res.status(500).json({ message: 'Failed to update NGO profile' });
    }
  },

<<<<<<< HEAD
  // Upload Compliance Documents
  uploadDocuments: async (req, res) => {
    try {
      const userId = req.userId;
      
      const ngo = await NGO.findOne({ userId });
      if (!ngo) {
        return res.status(404).json({ message: 'NGO profile not found' });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No documents uploaded' });
      }

      const newDocs = req.files.map(file => ({
        name: file.originalname,
        contentType: file.mimetype,
        data: file.buffer.toString('base64')
      }));
      
      // Add new files to existing certifications or replace them
      ngo.documents.certifications = [...ngo.documents.certifications, ...newDocs];
      ngo.verificationStatus = 'pending';
      
      await ngo.save();

      res.json({
        message: 'Documents uploaded successfully. Awaiting admin verification.',
        verificationStatus: ngo.verificationStatus
      });
    } catch (error) {
      console.error('Upload documents error:', error);
      res.status(500).json({ message: 'Failed to upload documents' });
    }
  },

=======
>>>>>>> 9b69005d4586ec2f41ef9a5cbce4270d37a0a929
  // Get NGO Statistics
  getNgoStats: async (req, res) => {
    try {
      const { ngoId } = req.params;

      const ngo = await NGO.findById(ngoId);
      if (!ngo) {
        return res.status(404).json({ message: 'NGO not found' });
      }

      // Get partnerships count
      const partnerships = await Partnership.countDocuments({
        ngoId,
        status: { $in: ['active', 'completed'] },
      });

      // Get active projects
      const activeProjects = await Partnership.countDocuments({
        ngoId,
        status: 'active',
      });

      // Get total beneficiaries
      const impacts = await ImpactUpdate.find({
        projectId: { $in: (await Partnership.find({ ngoId }).select('projectId')) },
        category: 'beneficiary',
      });

      const totalBeneficiaries = impacts.reduce((sum, impact) => sum + impact.metricValue, 0);

      // Get funding received
      const projects = await Partnership.find({ ngoId }).select('allocatedBudget');
      const fundingReceived = projects.reduce((sum, proj) => sum + (proj.allocatedBudget || 0), 0);

      res.json({
        stats: {
          totalPartners: partnerships,
          activeProjects,
          peopleImpacted: totalBeneficiaries,
          fundingReceived,
        },
      });
    } catch (error) {
      console.error('Get NGO stats error:', error);
      res.status(500).json({ message: 'Failed to fetch statistics' });
    }
  },

  // Get NGO Partnerships
  getNgoPartnerships: async (req, res) => {
    try {
      const { ngoId } = req.params;
      const { status, page = 1, limit = 10 } = req.query;

      const query = { ngoId };
      if (status) query.status = status;

      const partnerships = await Partnership.find(query)
        .populate('corporateId', 'companyName')
        .populate('projectId', 'title budget')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Partnership.countDocuments(query);

      const formattedPartnerships = partnerships.map(p => ({
        id: p._id,
        corporateName: p.corporateId?.companyName,
        projectTitle: p.projectId?.title,
        budget: p.projectId?.budget,
        status: p.status,
        startDate: p.startDate,
        endDate: p.endDate,
        beneficiariesCount: p.beneficiariesCount,
      }));

      res.json({
        partnerships: formattedPartnerships,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Get NGO partnerships error:', error);
      res.status(500).json({ message: 'Failed to fetch partnerships' });
    }
  },

  // Send Partnership Proposal
  sendPartnershipProposal: async (req, res) => {
    try {
      const userId = req.userId;
      const { projectId, scope, expectedOutcomes, proposedBudget } = req.body;

      const ngo = await NGO.findOne({ userId });
      if (!ngo) {
        return res.status(404).json({ message: 'NGO profile not found' });
      }

      const project = await CSRProject.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      if (project.approvalStatus !== 'approved') {
        return res.status(400).json({ message: 'Project is not approved for proposals yet' });
      }

      const partnership = new Partnership({
        ngoId: ngo._id,
        corporateId: project.corporate,
        projectId,
        proposedBudget,
        scope,
        expectedOutcomes,
        status: 'proposed',
        approvalStatus: 'pending',
      });

      await partnership.save();

      res.status(201).json({
        message: 'Partnership proposal sent successfully',
        partnership,
      });
    } catch (error) {
      console.error('Send partnership proposal error:', error);
      res.status(500).json({ message: 'Failed to send partnership proposal' });
    }
  },

  // Get NGO Public Profile
  getPublicNgoProfile: async (req, res) => {
    try {
      const { ngoId } = req.params;

      const ngo = await NGO.findById(ngoId)
        .select('-documents')
        .populate('partnerships', 'status -ngoId');

      if (!ngo) {
        return res.status(404).json({ message: 'NGO not found' });
      }

      res.json({
        ngo,
      });
    } catch (error) {
      console.error('Get public NGO profile error:', error);
      res.status(500).json({ message: 'Failed to fetch NGO profile' });
    }
  },

  // Search NGOs
  searchNgos: async (req, res) => {
    try {
      const { search, focusArea, state, page = 1, limit = 10 } = req.query;

      const query = {};

      if (search) {
        query.$or = [
          { ngoName: { $regex: search, $options: 'i' } },
          { mission: { $regex: search, $options: 'i' } },
        ];
      }

      if (focusArea) {
        query.focusAreas = focusArea;
      }

      if (state) {
        query.states = state;
      }

      const ngos = await NGO.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select('-documents');

      const total = await NGO.countDocuments(query);

      res.json({
        ngos,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Search NGOs error:', error);
      res.status(500).json({ message: 'Failed to search NGOs' });
    }
  },

  // Add Impact Update
  addImpactUpdate: async (req, res) => {
    try {
      const { projectId, metricName, metricValue, metricUnit, description, category } = req.body;

      const impactUpdate = new ImpactUpdate({
        projectId,
        metricName,
        metricValue,
        metricUnit,
        description,
        category: category || 'other',
      });

      await impactUpdate.save();

      // Update project's total beneficiaries if it's a beneficiary metric
      if (category === 'beneficiary') {
        await CSRProject.findByIdAndUpdate(
          projectId,
          { $inc: { beneficiaries: metricValue } }
        );
      }

      res.status(201).json({
        message: 'Impact update added successfully',
        update: impactUpdate,
      });
    } catch (error) {
      console.error('Add impact update error:', error);
      res.status(500).json({ message: 'Failed to add impact update' });
    }
  },

  // Get Project Impact Updates
  getProjectImpactUpdates: async (req, res) => {
    try {
      const { projectId } = req.params;
      const { page = 1, limit = 20 } = req.query;

      const updates = await ImpactUpdate.find({ projectId })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await ImpactUpdate.countDocuments({ projectId });

      res.json({
        updates,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Get impact updates error:', error);
      res.status(500).json({ message: 'Failed to fetch impact updates' });
    }
  },
};

module.exports = ngoController;
