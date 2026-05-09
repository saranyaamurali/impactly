// backend/models/CSRArticle.js

const mongoose = require('mongoose');

const csrArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        enum: [
            'CSR Basics',
            'Legal Compliance',
            'Best Practices',
            'Impact Measurement',
            'Environment & Sustainability',
            'Education',
            'Health & Wellness',
            'Livelihood & Poverty',
            'Community Development',
            'Data & Analytics',
            'Disaster Relief',
            'Stakeholder Engagement',
            'Reporting & Transparency',
            'Innovation & Technology',
            'Future Outlook',
        ],
        required: true,
    },
    image: {
        type: String,
        required: true, // URL to image
    },
    link: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    readTime: {
        type: String,
        required: true, // e.g., "8 min"
    },
    featured: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    source: {
        type: String,
        enum: ['Internal', 'External'],
        default: 'External',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Index for faster queries
csrArticleSchema.index({ category: 1 });
csrArticleSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('CSRArticle', csrArticleSchema);