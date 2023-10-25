const express = require ('express');
const yahooFinance = require('yahoo-finance2').default;
const router = express.Router();
const finKey = process.env.API_KEY;
const FindSymbolName = require('../helperfunctions/findsymbolname.js')
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey =finKey;
const finnhubClient = new finnhub.DefaultApi();
router.post('/sendsymbol',async (req,res)=>{
    const symbol = req.body.symbol;
    let result  = {symbol:symbol};
    if(symbol!=''){
        // result.name= FindSymbolName(symbol);
        const symbolSearch = await yahooFinance.search(symbol);
        result.name = symbolSearch.quotes[0].shortname;
        console.log(result);
    }
    finnhubClient.quote(symbol,(error,data,response)=>{
        result.data=data;
        res.json(result);
    })
});


module.exports = router;