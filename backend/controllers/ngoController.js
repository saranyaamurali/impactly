const NGO = require('../models/NGO');

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

  // Get NGO Statistics
  getNgoStats: async (req, res) => {
    try {
      res.json({
        stats: {
          totalPartners: 0,
          activeProjects: 0,
          peopleImpacted: 0,
          fundingReceived: 0,
        },
      });
    } catch (error) {
      console.error('Get NGO stats error:', error);
      res.status(500).json({ message: 'Failed to fetch statistics' });
    }
  },

  getNgoPartnerships: async (req, res) => {
    try {
      res.json({
        partnerships: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          pages: 0,
        },
      });
    } catch (error) {
      console.error('Get NGO partnerships error:', error);
      res.status(500).json({ message: 'Failed to fetch partnerships' });
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

};

module.exports = ngoController;
