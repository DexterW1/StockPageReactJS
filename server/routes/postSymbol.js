const express = require ('express');
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
    console.log(req.body);
    if(symbol!=''){
        result.name= FindSymbolName(symbol);
    }
    finnhubClient.quote(symbol,(error,data,response)=>{
        console.log(data);
        result.data=data;
        res.json(result);
    })
});
// router.get('/listData',async(req,res)=>{
//     console.log("get called");
//     let result  = {symbol:storedWatchlist};
//     let name = '';

//     if(storedWatchlist!=''){
//         result.name= FindSymbolName(storedWatchlist);
//     }
//     console.log("About to enter finnhub");
//     finnhubClient.quote(storedWatchlist,(error,data,response)=>{
//         console.log("entered finnhub before freezing");
//         console.log(data);
//         result.data=data;
//         res.json(result);
//     })
//     console.log("finished call");
// });


module.exports = router;