const mongoose = require("mongoose");

const csrProjectSchema = new mongoose.Schema(
  {
    legacyId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    corporate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Corporate",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      default: 0,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    timeline: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "completed"],
      default: "pending",
    },
    companySponsor: {
      type: String,
      required: true,
      trim: true,
    },
    implementingPartner: {
      type: String,
      default: "",
      trim: true,
    },
    beneficiaries: {
      type: Number,
      default: 0,
      min: 0,
    },
    districts: {
      type: [String],
      default: [],
    },
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    officialWebsite: {
      type: String,
      default: "",
      trim: true,
    },
    sourceWebsite: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    impactIdea: {
      type: String,
      default: "",
      trim: true,
    },
    sdgFocus: {
      type: [String],
      default: [],
    },
    expectedOutcomes: {
      type: [String],
      default: [],
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

csrProjectSchema.index({ category: 1, location: 1, visibility: 1 });

module.exports = mongoose.model("CSRProject", csrProjectSchema);
