const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Connect to MongoDB
db();

// Routes
const authRoutes = require('./routes/authRoutes');
const ngoAuthRoutes = require('./routes/ngoAuthRoutes');
const ngoRoutes = require('./routes/ngoRoutes');
const csrProjectRoutes = require('./routes/csrProjectRoutes');
const corporateRoutes = require('./routes/corporateRoutes');
const blogRoutes = require('./routes/blogRoutes');
const ecosystemRoutes = require('./routes/ecosystemRoutes');
const matchmakingRoutes = require('./routes/matchmakingRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', ngoAuthRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/csr-project', csrProjectRoutes);
app.use('/api/corporate', corporateRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/ecosystem', ecosystemRoutes);
app.use('/api/matchmaking', matchmakingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Impactly API Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.MONGODB_URI || 'local'}`);
});

module.exports = app;
