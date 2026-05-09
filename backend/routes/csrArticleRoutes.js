// backend/routes/csrArticleRoutes.js

const express = require('express');
const router = express.Router();
const CSRArticle = require('../models/CSRArticle');

// GET /api/csr/articles?category=Education&search=skills&limit=15
router.get('/articles', async (req, res) => {
    try {
        const { category, search, limit = 15, page = 1 } = req.query;

        let query = {};

        // Category filter
        if (category && category !== 'All') {
            query.category = category;
        }

        // Search filter
        if (search) {
            query.$text = { $search: search };
        }

        // Execute query with pagination
        const articles = await CSRArticle.find(query)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await CSRArticle.countDocuments(query);

        res.json({
            items: articles,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / parseInt(limit)),
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Error fetching articles' });
    }
});

// GET /api/csr/articles/:id
router.get('/articles/:id', async (req, res) => {
    try {
        const article = await CSRArticle.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Increment view count
        article.views += 1;
        await article.save();

        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article' });
    }
});

// GET /api/csr/articles/categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await CSRArticle.distinct('category');
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

// POST /api/csr/articles (Admin only)
router.post('/articles', async (req, res) => {
    try {
        const { title, description, category, image, link, author, readTime } = req.body;

        // Validate required fields
        if (!title || !description || !category || !link) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const article = new CSRArticle({
            title,
            description,
            category,
            image,
            link,
            author,
            readTime,
        });

        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article' });
    }
});

// PUT /api/csr/articles/:id (Admin only)
router.put('/articles/:id', async (req, res) => {
    try {
        const article = await CSRArticle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error updating article' });
    }
});

// DELETE /api/csr/articles/:id (Admin only)
router.delete('/articles/:id', async (req, res) => {
    try {
        const article = await CSRArticle.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article' });
    }
});

// POST /api/csr/articles/:id/click (Track clicks)
router.post('/articles/:id/click', async (req, res) => {
    try {
        const article = await CSRArticle.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        article.clicks += 1;
        await article.save();

        res.json({ clicks: article.clicks });
    } catch (error) {
        res.status(500).json({ message: 'Error tracking click' });
    }
});

module.exports = router;