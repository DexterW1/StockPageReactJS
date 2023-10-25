const yahooFinance = require('yahoo-finance2').default;
const express = require('express');
const router = express.Router();
const getTodayTimeUnix = require('../helperfunctions/helperfunction');
const convertData = require('../helperfunctions/converttimeunix');


router.get('/dowroute',async(req,res)=>{
    const {start,end} = getTodayTimeUnix();
    console.log("Start: ",start);
    console.log("end: ",end);
    // const queryOptions = {period1:start,period2:end+(5*60),interval:'5m',lang:"en-us"}
    const queryOptions = {period1:start,interval:'5m',lang:"en-us"}
    const result1 =await yahooFinance.chart('^IXIC',queryOptions);
    convertData(result1);
    const newData = {symbol:'^IXIC',data:result1};
    res.json(newData);

});


module.exports =router;