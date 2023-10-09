import React,{useEffect,useState} from 'react'
import '../styles/DashboardCard.css'
import ChartCard from './ChartCard';
import SymbolInfo from './SymbolInfo';
const finKey = process.env.REACT_APP_API_KEY;

function getTodayTimeUnix() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const utcOffset = now.getTimezoneOffset(); // Get UTC offset in minutes
  const pdtOffset = 7 * 60; // PDT (Pacific Daylight Time) UTC offset is -7 hours

  let startOfDayPDT, endOfDayPDT;

  // If it's a Saturday (dayOfWeek === 6) or Sunday (dayOfWeek === 0), use Friday's time frame
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    startOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - (dayOfWeek === 0 ? 2 : 1), // Go back to Friday for Sunday
      6 + pdtOffset / 60,
      30 + pdtOffset % 60,
      0
    );
    endOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - (dayOfWeek === 0 ? 2 : 1), // Go back to Friday for Sunday
      13 + pdtOffset / 60,
      0 + pdtOffset % 60,
      0
    );
  } else {
    // It's not Saturday or Sunday, use the regular time frame
    startOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      6 + pdtOffset / 60,
      30 + pdtOffset % 60,
      0
    );
    endOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      13 + pdtOffset / 60,
      0 + pdtOffset % 60,
      0
    );
  }

  const startOfDayUTC = new Date(
    startOfDayPDT.getTime() - utcOffset * 60000
  ).getTime();
  const endOfDayUTC = new Date(
    endOfDayPDT.getTime() - utcOffset * 60000
  ).getTime();

  return { start: startOfDayUTC, end: endOfDayUTC };
}
export default function DashboardCard(props) {
  const {stockName}=props;
  const[stock,setStock]=useState([]);
  // const[stock2,setStock2]=useState([]);
  // const[stock3,setStock3]=useState([]);
  useEffect(()=>{
    let tickerSymbol;
    if(stockName==='Tesla'){
      tickerSymbol='TSLA';
    }
    else if(stockName==='Google'){
      tickerSymbol='GOOGL';
    }
    else{
      tickerSymbol='AAPL';
    }
    const {start,end} = getTodayTimeUnix();
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = finKey;
    const finnhubClient = new finnhub.DefaultApi()
    console.log(stockName);
    finnhubClient.stockCandles(`${tickerSymbol}`, "5", start/1000,end/1000, (error, data, response) => {
        setStock(data);
        // console.log(data);
    });
  },[]);
  return (
    <>
        <div className="dashboard-card">
          <div className="stock-name">
            <h2>{stockName}</h2>
          </div>
          <div className="stock-data">
            <ChartCard SymbolData={stock}/>
          </div>
          <div className="stock-info">
            <SymbolInfo StockName ={stockName}/>
          </div>
        </div>
    
    </>
  )
}
