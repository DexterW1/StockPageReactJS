// routes/index.js
const express = require('express');
const router = express.Router();

const marketNewsRoutes = require('./marketNewsRoute');
const stockCandlesRoutes = require('./stockCandlesRoute');
const quoteRoutes = require('./quoteRoute');
const postSymbol = require('./postSymbol');
const trendSymbol = require('./trendingsymbols');
const trend=require('./actualTrend');
const dowRoute=require('./dowroute');
// Import other route files as needed

// Use the routes
router.use('/api', marketNewsRoutes);
router.use('/api',stockCandlesRoutes);
router.use('/api',quoteRoutes);
router.use('/api',trendSymbol);
router.use('/api',trend);
router.use('/api',dowRoute)
router.use('/api/postsymbol',postSymbol);
// Use other route files as needed

module.exports = router;
