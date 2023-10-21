const yahooFinance = require('yahoo-finance2').default;
const express = require('express');
const router = express.Router();

router.get('/trend',async(req,res)=>{
    const queryOptions= {count:17, lang:'en-US'};
    const queryOptions1 = {modules:['price','topHoldings']};
    const result = await yahooFinance.trendingSymbols('US',queryOptions);
    let summary= {};
    console.log(result);
    const promise = result.quotes.map(async(item)=>{
        const result = await yahooFinance.quoteSummary(item.symbol,queryOptions1);
        return {data:result, symbol:item.symbol};
    })
    const send = await Promise.all(promise);
    res.json(send);
});

module.exports = router;