const yahooFinance = require('yahoo-finance2').default
const express = require('express');
const router = express.Router();
// require('dotenv').config();
const finKey = process.env.API_KEY;

router.get('/quote',async(req,res)=>{
    const queryOptions = {modules:['price','summaryDetail']};
    const result1 = await yahooFinance.quoteSummary('^IXIC',queryOptions);
    const result2 = await yahooFinance.quoteSummary('^DJI',queryOptions);
    const result3 = await yahooFinance.quoteSummary('^GSPC',queryOptions);

    Promise.all([result1, result2, result3])
     .then((results) => {
        // Combine the results into a single JSON object
        const combinedData = {
        '^IXIC': results[0],
        '^DJI': results[1],
        '^GSPC': results[2],
     };
     // Send the combined data to the frontend
     res.json(combinedData);
     })
    .catch((error) => {
        console.error('Error:', error);
    });
});

module.exports= router;