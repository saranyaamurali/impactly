const mongoose = require('mongoose');

const impactUpdateSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CSRProject',
      required: true,
    },
    metricName: {
      type: String,
      required: true,
      trim: true,
    },
    metricValue: {
      type: Number,
      required: true,
    },
    metricUnit: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['beneficiary', 'outcome', 'reach', 'budget', 'progress', 'other'],
      default: 'other',
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    attachments: {
      type: [String], // URLs to images, documents
      default: [],
    },
    location: {
      state: String,
      district: String,
    },
    photographs: [String],
    beneficiaryStories: [
      {
        title: String,
        story: String,
        photo: String,
        beneficiaryName: String,
      },
    ],
  },
  { timestamps: true }
);

impactUpdateSchema.index({ projectId: 1, createdAt: -1 });
impactUpdateSchema.index({ category: 1 });
impactUpdateSchema.index({ verificationStatus: 1 });

module.exports = mongoose.model('ImpactUpdate', impactUpdateSchema);
