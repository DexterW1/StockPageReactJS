const yahooFinance = require('yahoo-finance2').default;
const express = require('express');
const router = express.Router();
const getTodayTimeUnix = require('../helperfunctions/helperfunction');
const convertData = require('../helperfunctions/converttimeunix');

router.get('/trending',async(req,res)=>{
    const {start,end} = getTodayTimeUnix();
    console.log("start: ",start);
    console.log("end: ",end);
    const queryOptions = {period1:start,interval:'5m',lang:"en-us"}
    const result1 =await yahooFinance.chart('^IXIC',queryOptions);
    const result2 =await yahooFinance.chart('^DJI',queryOptions);
    const result3 =await yahooFinance.chart('^GSPC',queryOptions);
    convertData(result1);
    convertData(result2);
    convertData(result3);
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


module.exports =router;
