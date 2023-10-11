const express = require('express');
const router = express.Router();
// require('dotenv').config();
const finKey = process.env.API_KEY;

router.get('/quote',async(req,res)=>{
    try {
        const finnhub = require('finnhub');
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey =finKey;
        const finnhubClient = new finnhub.DefaultApi();
        const symb = ["TSLA","AAPL","GOOGL"];
        const promisedData = symb.map((item)=>{
            return new Promise ((resolve,reject)=>{
                finnhubClient.quote(item,(error,data,response)=>{
                    if(error){
                        reject(error);
                    }
                    else{
                        resolve({item,data});
                    }
                });
            });
        });
        const newData = await Promise.all(promisedData);
        res.json(newData);
    } catch (error) {
        console.log(error);
    }
});

module.exports= router;