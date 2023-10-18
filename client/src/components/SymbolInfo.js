import React,{useEffect, useState} from 'react'
import '../styles/SymbolInfo.css'
function formatData(value) {
  const roundedValue = parseFloat(value).toFixed(2);
  return parseFloat(roundedValue).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  });
}
export default function SymbolInfo(props) {
    const {StockName} = props;
    if (!StockName || !StockName.summaryDetail ) {
      // Data is not available yet or doesn't have quotes, you can return a loading indicator or handle this case.
      return <div>Loading...</div>;
    }
  return (
    <>
        <div className="col1">
            <p>Open:&nbsp;&nbsp;{formatData(StockName.summaryDetail.open)}</p>
            <p>Volume:&nbsp;&nbsp;{StockName.summaryDetail.volume}</p>
        </div>
        <div className="col2">
            <p>High:&nbsp;&nbsp;{formatData(StockName.summaryDetail.dayHigh)}</p>
            <p>Low:&nbsp;&nbsp;{formatData(StockName.summaryDetail.dayLow)}</p>
            
        </div> 
    
    </>
  )
}
