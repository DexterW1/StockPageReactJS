const express = require ('express');
const router = express.Router();
const finKey = process.env.API_KEY;
const FindSymbolName = require('../helperfunctions/findsymbolname.js')
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey =finKey;
const finnhubClient = new finnhub.DefaultApi();
router.post('/sendsymbol',async (req,res)=>{
    console.log("reqbody",req.body);
    const symbol = req.body.symbol;
    console.log("Symbol:",symbol);
    let result  = {symbol:symbol};
    if(symbol!=''){
        result.name= FindSymbolName(symbol);
        console.log("result.name",result.name);
    }
    finnhubClient.quote(symbol,(error,data,response)=>{
        result.data=data;
        console.log("result:",result);
        res.json(result);
    })
});


module.exports = router;