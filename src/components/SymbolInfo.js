import React,{useEffect} from 'react'
import '../styles/SymbolInfo.css'
const finKey = process.env.REACT_APP_API_KEY;

export default function SymbolInfo(props) {
    const {stockName} = props;
    useEffect(()=>{
        const finnhub = require('finnhub');
        console.log(stockName);
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = finKey;
        const finnhubClient = new finnhub.DefaultApi()
        finnhubClient.quote(`${stockName}`, (error, data, response) => {
            console.log(data)
        });
    },[]);

  return (
    <>
        <div className="col1">
            <p>High: </p>
            <p>Low: </p>
        </div>
        <div className="col2">
            <p>High: </p>
            <p>Low: </p>
        </div> 
    
    </>
  )
}
