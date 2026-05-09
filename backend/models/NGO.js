const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    ngoName: {
      type: String,
      required: true,
      trim: true,
    },
    mission: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: '',
    },
    focusAreas: {
      type: [String],
      default: [],
    },
    contactPerson: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    states: {
      type: [String],
      default: [],
    },
    budget: {
      type: Number,
      default: 0,
    },
    logo: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    registrationNumber: {
      type: String,
      default: '',
    },
    yearFounded: {
      type: Number,
      default: new Date().getFullYear(),
    },
    teamSize: {
      type: Number,
      default: 0,
    },
    totalBeneficiaries: {
      type: Number,
      default: 0,
    },
    totalFundingReceived: {
      type: Number,
      default: 0,
    },
    partnerships: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Partnership',
      default: [],
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    documents: {
      certifications: [String],
      annualReports: [String],
    },
  },
  { timestamps: true }
);

// Index for faster queries
ngoSchema.index({ email: 1 });
ngoSchema.index({ focusAreas: 1 });
ngoSchema.index({ states: 1 });

module.exports = mongoose.model('NGO', ngoSchema);
