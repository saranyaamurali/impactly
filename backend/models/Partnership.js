const mongoose = require('mongoose');

const partnershipSchema = new mongoose.Schema(
  {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NGO',
      required: true,
    },
    corporateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Corporate',
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CSRProject',
      required: true,
    },
    status: {
      type: String,
      enum: ['proposed', 'accepted', 'active', 'completed', 'rejected'],
      default: 'proposed',
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    rejectionReason: {
      type: String,
      default: '',
    },
    proposedBudget: {
      type: Number,
      required: true,
    },
    allocatedBudget: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    scope: {
      type: String,
      required: true,
    },
    expectedOutcomes: {
      type: [String],
      default: [],
    },
    beneficiariesCount: {
      type: Number,
      default: 0,
    },
    metricsTracked: {
      type: [String],
      default: [],
    },
    documents: {
      agreement: String,
      reports: [String],
    },
    messages: [
      {
        senderId: mongoose.Schema.Types.ObjectId,
        senderType: String, // 'ngo' or 'corporate'
        message: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    reviews: {
      ngoReview: {
        rating: Number,
        comment: String,
        createdAt: Date,
      },
      corporateReview: {
        rating: Number,
        comment: String,
        createdAt: Date,
      },
    },
  },
  { timestamps: true }
);

partnershipSchema.index({ ngoId: 1, status: 1 });
partnershipSchema.index({ corporateId: 1, status: 1 });
partnershipSchema.index({ projectId: 1 });

module.exports = mongoose.model('Partnership', partnershipSchema);
