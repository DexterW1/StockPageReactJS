import React,{useEffect,useState} from 'react'
import '../styles/DashboardCard.css'
import ChartCard from './ChartCard';
import SymbolInfo from './SymbolInfo';
function formatYAxisLabel(value) {
  const roundedValue = parseFloat(value).toFixed(2);
  return parseFloat(roundedValue).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  });
}
export default function DashboardCard(props) {
  const {stockName,Data,tickerSym}=props;
  return (
    <>
        <div className="dashboard-card">
          <div className="stock-name">
            <h2>{stockName}</h2>
            <h3 className={Data.quotes[0].close < Data.quotes[Data.quotes.length-1].close ? 'greencolor':'redcolor'}>{formatYAxisLabel(Data.meta.regularMarketPrice)}</h3>
          </div>
          <div className="stock-data">
            <ChartCard SymbolData={Data} />
          </div>
          <div className="stock-info">
            <SymbolInfo StockName ={tickerSym}/>
          </div>
        </div>
    
    </>
  )
}
