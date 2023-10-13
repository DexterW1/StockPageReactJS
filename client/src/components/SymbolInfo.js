import React,{useEffect, useState} from 'react'
import '../styles/SymbolInfo.css'
import Decimal from 'decimal.js'
export default function SymbolInfo(props) {
    const {StockName} = props;
    function handleRound(number){
      if (typeof number === 'number' && !isNaN(number)) {
        const originalNumber = new Decimal(number);
        return originalNumber.toDecimalPlaces(2).toNumber();
      } else {
        // Handle the case where 'number' is not a valid number
        return 0; // Or any other default value you prefer
      }
    }
  return (
    <>
        <div className="col1">
            <p>Open:&nbsp;&nbsp;{handleRound(StockName.o)}</p>
            <p>High:&nbsp;&nbsp;{handleRound(StockName.h)}</p>
            <p>Low:&nbsp;&nbsp;{handleRound(StockName.l)}</p>
        </div>
        <div className="col2">
            <p>Current Price:&nbsp;&nbsp;{handleRound(StockName.c)}</p>
            <p>Change:&nbsp;&nbsp;{handleRound(StockName.d)}</p>
            <p>Percent Change:&nbsp;&nbsp;{handleRound(StockName.dp)}%</p>
        </div> 
    
    </>
  )
}
