import React,{useEffect,useState} from 'react'
import '../styles/DashboardCard.css'
import ChartCard from './ChartCard';
import SymbolInfo from './SymbolInfo';
export default function DashboardCard(props) {
  const {stockName,Data,tickerSym}=props;
  return (
    <>
        <div className="dashboard-card">
          <div className="stock-name">
            <h2>{stockName}</h2>
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
