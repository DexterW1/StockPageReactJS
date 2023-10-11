// routes/index.js
const express = require('express');
const router = express.Router();

const marketNewsRoutes = require('./marketNewsRoute');
const stockCandlesRoutes = require('./stockCandlesRoute');
const quoteRoutes = require('./quoteRoute');
// Import other route files as needed

// Use the routes
router.use('/api', marketNewsRoutes);
router.use('/api',stockCandlesRoutes);
router.use('/api',quoteRoutes);
// Use other route files as needed

module.exports = router;
