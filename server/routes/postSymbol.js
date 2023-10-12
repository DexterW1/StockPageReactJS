const express = require ('express');
const router = express.Router();


router.post('/postSymbol',async (req,res)=>{
    const symbol = req.body.symbol;
    console.log(symbol);
});


module.exports = router;