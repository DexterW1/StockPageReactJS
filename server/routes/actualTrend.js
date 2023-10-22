const yahooFinance = require('yahoo-finance2').default;
const express = require('express');
const router = express.Router();

router.get('/trend',async(req,res)=>{
    const queryOptions= {count:30, lang:'en-US'};
    const queryOptions1 = {modules:['price','topHoldings']};
    let result = await yahooFinance.trendingSymbols('US',queryOptions);
    console.log(result);
    result = result.quotes.filter((item)=> item.symbol!==':entitySlug');
    console.log(result);
    const promise = result.map(async(item)=>{
        const result = await yahooFinance.quoteSummary(item.symbol,queryOptions1);
        return {data:result, symbol:item.symbol};
    }).slice(0,17);
    const send = await Promise.all(promise);
    res.json(send);
});

module.exports = router;