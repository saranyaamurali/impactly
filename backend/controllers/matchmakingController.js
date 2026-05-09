const NGO = require('../models/NGO');
const CSRProject = require('../models/CSRProject');
const Partnership = require('../models/Partnership');

const matchmakingController = {
  // Calculate alignment score between NGO and Project
  calculateAlignment: (ngo, project) => {
    let score = 0;

    // Focus area alignment (max 40 points)
    const ngoFocus = ngo.focusAreas || [];
    const projectFocus = project.csrCategory ? [project.csrCategory] : [];
    const commonFocus = ngoFocus.filter(f => 
      projectFocus.some(pf => pf.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(pf.toLowerCase()))
    );
    const focusScore = ngoFocus.length > 0 ? (commonFocus.length / ngoFocus.length) * 40 : 20;
    score += focusScore;

    // Location match (max 30 points)
    const ngoStates = ngo.states || [];
    if (ngoStates.includes(project.location)) {
      score += 30;
    } else if (ngoStates.length > 0 && project.location) {
      score += 15;
    }

    // Scale compatibility (max 20 points)
    if (ngo.budget && project.budget) {
      const budgetRatio = project.budget / ngo.budget;
      if (budgetRatio > 0.5 && budgetRatio < 2) {
        score += 20;
      } else if (budgetRatio > 0.25 && budgetRatio < 4) {
        score += 10;
      }
    }

    // Mission alignment (max 10 points)
    if (ngo.mission && project.description) {
      const ngoMissionWords = ngo.mission.toLowerCase().split(/\s+/);
      const projectDescWords = project.description.toLowerCase().split(/\s+/);
      const matches = ngoMissionWords.filter(word => 
        projectDescWords.includes(word) && word.length > 3
      ).length;
      const missionScore = Math.min((matches / Math.max(ngoMissionWords.length, 1)) * 10, 10);
      score += missionScore;
    }

    return Math.round(Math.max(0, Math.min(100, score)));
  },

  // Get match reasons
  getMatchReasons: (ngo, project) => {
    const reasons = [];

    const ngoFocus = ngo.focusAreas || [];
    const projectFocus = project.csrCategory || '';
    const commonFocus = ngoFocus.filter(f => 
      projectFocus.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(projectFocus.toLowerCase())
    );
    if (commonFocus.length > 0) {
      reasons.push(`Aligned focus areas: ${commonFocus.join(', ')}`);
    }

    const ngoStates = ngo.states || [];
    if (ngoStates.includes(project.location)) {
      reasons.push(`Operating in ${project.location}`);
    }

    if (ngo.mission && project.description) {
      reasons.push('Strong mission alignment');
    }

    return reasons;
  },

  // Get all matches for an NGO
  getNgoMatches: async (req, res) => {
    try {
      const { ngoId } = req.params;
      const { minScore = 50, focusArea, location, page = 1, limit = 10 } = req.query;

      const ngo = await NGO.findById(ngoId);
      if (!ngo) {
        return res.status(404).json({ message: 'NGO not found' });
      }

      // Get all public projects
      let projectQuery = { visibility: 'public', status: 'active' };
      if (focusArea) {
        projectQuery.csrCategory = focusArea;
      }
      if (location) {
        projectQuery.location = location;
      }

      const projects = await CSRProject.find(projectQuery)
        .populate('corporateId', 'companyName');

      // Calculate matches
      const matches = projects
        .map(project => {
          const score = matchmakingController.calculateAlignment(ngo, project);
          return {
            id: `${ngo._id}-${project._id}`,
            project,
            score,
            matchReasons: matchmakingController.getMatchReasons(ngo, project),
          };
        })
        .filter(match => match.score >= minScore)
        .sort((a, b) => b.score - a.score);

      // Paginate
      const total = matches.length;
      const start = (page - 1) * limit;
      const paginatedMatches = matches.slice(start, start + limit);

      res.json({
        matches: paginatedMatches,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Get NGO matches error:', error);
      res.status(500).json({ message: 'Failed to fetch matches' });
    }
  },

  // Get all matches for a Corporate
  getCorporateMatches: async (req, res) => {
    try {
      const { corporateId } = req.params;
      const { minScore = 50, focusArea, page = 1, limit = 10 } = req.query;

      // Get corporate's projects
      let projectQuery = { corporateId, visibility: 'public', status: 'active' };
      const projects = await CSRProject.find(projectQuery);

      if (projects.length === 0) {
        return res.json({
          matches: [],
          pagination: { total: 0, page: 1, limit, pages: 0 },
        });
      }

      const projectIds = projects.map(p => p._id);

      // Get all NGOs
      let ngoQuery = { verificationStatus: 'verified' };
      if (focusArea) {
        ngoQuery.focusAreas = focusArea;
      }

      const ngos = await NGO.find(ngoQuery);

      // Calculate matches
      const matches = [];
      for (const project of projects) {
        for (const ngo of ngos) {
          const score = matchmakingController.calculateAlignment(ngo, project);
          if (score >= minScore) {
            matches.push({
              id: `${ngo._id}-${project._id}`,
              ngo,
              project,
              score,
              matchReasons: matchmakingController.getMatchReasons(ngo, project),
            });
          }
        }
      }

      // Sort by score
      matches.sort((a, b) => b.score - a.score);

      // Paginate
      const total = matches.length;
      const start = (page - 1) * limit;
      const paginatedMatches = matches.slice(start, start + limit);

      res.json({
        matches: paginatedMatches,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Get corporate matches error:', error);
      res.status(500).json({ message: 'Failed to fetch matches' });
    }
  },

  // Get match details
  getMatchDetails: async (req, res) => {
    try {
      const { ngoId, projectId } = req.params;

      const ngo = await NGO.findById(ngoId);
      const project = await CSRProject.findById(projectId).populate('corporateId', 'companyName');

      if (!ngo || !project) {
        return res.status(404).json({ message: 'NGO or project not found' });
      }

      const score = matchmakingController.calculateAlignment(ngo, project);
      const matchReasons = matchmakingController.getMatchReasons(ngo, project);

      // Check if partnership already exists
      const existingPartnership = await Partnership.findOne({
        ngoId,
        projectId,
      });

      res.json({
        match: {
          ngo,
          project,
          score,
          matchReasons,
          existingPartnership: existingPartnership || null,
        },
      });
    } catch (error) {
      console.error('Get match details error:', error);
      res.status(500).json({ message: 'Failed to fetch match details' });
    }
  },

  // Recommend matches (AI-like ranking)
  getRecommendedMatches: async (req, res) => {
    try {
      const { type, id, limit = 5 } = req.query;

      if (type === 'ngo') {
        const ngo = await NGO.findById(id);
        if (!ngo) {
          return res.status(404).json({ message: 'NGO not found' });
        }

        const projects = await CSRProject.find({ 
          visibility: 'public', 
          status: 'active' 
        }).populate('corporateId', 'companyName');

        const rankedMatches = projects
          .map(project => ({
            project,
            score: matchmakingController.calculateAlignment(ngo, project),
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, limit);

        res.json({ recommendations: rankedMatches });
      } else if (type === 'corporate') {
        const projects = await CSRProject.find({ 
          corporateId: id, 
          visibility: 'public', 
          status: 'active' 
        });

        if (projects.length === 0) {
          return res.json({ recommendations: [] });
        }

        const ngos = await NGO.find({ verificationStatus: 'verified' });

        const allMatches = [];
        for (const project of projects) {
          for (const ngo of ngos) {
            allMatches.push({
              ngo,
              project,
              score: matchmakingController.calculateAlignment(ngo, project),
            });
          }
        }

        const rankedMatches = allMatches
          .sort((a, b) => b.score - a.score)
          .slice(0, limit);

        res.json({ recommendations: rankedMatches });
      } else {
        res.status(400).json({ message: 'Invalid type parameter' });
      }
    } catch (error) {
      console.error('Get recommended matches error:', error);
      res.status(500).json({ message: 'Failed to fetch recommendations' });
    }
  },
};

module.exports = matchmakingController;
