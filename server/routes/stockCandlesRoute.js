const express = require('express');
const router = express.Router();
const finKey = process.env.API_KEY;
const getTodayTimeUnix = require('../helperfunctions/helperfunction');
const finnhub = require('finnhub'); // Import finnhub here

// Define an API route to fetch market news data
router.get('/stock-candles', async (req, res) => {
  try {
    const { start, end } = getTodayTimeUnix();
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = finKey;
    const finnhubClient = new finnhub.DefaultApi();
    // Define an array of stock symbols you want to fetch
    const stockSymbols = ["TSLA", "AAPL", "GOOGL"]; // Add more symbols as needed
    // Use Promise.all to make multiple API requests concurrently
    const stockPromises = stockSymbols.map((symbol) => {
      return new Promise((resolve, reject) => {
        finnhubClient.stockCandles(
          symbol,
          "5",
          start / 1000,
          end / 1000,
          (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              resolve({ symbol, data }); // Resolve with both symbol and data
            }
          }
        );
      });
    });
    // Wait for all promises to resolve
    const stockData = await Promise.all(stockPromises);
    // Send the combined results as a single response
    res.json(stockData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
