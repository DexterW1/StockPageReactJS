const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const finKey = process.env.API_KEY;
// Define an API route to fetch market news data

router.get('/market-news', async (req, res) => {
  try {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = finKey;
    const finnhubClient = new finnhub.DefaultApi()
    finnhubClient.marketNews("general", {}, (error, data, response) => {
      res.json(data.slice(0,10));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});

module.exports = router;