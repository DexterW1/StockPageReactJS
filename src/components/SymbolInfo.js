import React,{useEffect, useState} from 'react'
import '../styles/SymbolInfo.css'

export default function SymbolInfo(props) {
    const {StockName} = props;

  return (
    <>
        <div className="col1">
            <p>Open:&nbsp;&nbsp;{StockName.o}</p>
            <p>High:&nbsp;&nbsp;{StockName.h}</p>
            <p>Low:&nbsp;&nbsp;{StockName.l}</p>
        </div>
        <div className="col2">
            <p>Current Price:&nbsp;&nbsp;{StockName.c}</p>
            <p>Change:&nbsp;&nbsp;{StockName.d}</p>
            <p>Percent Change:&nbsp;&nbsp;{StockName.dp}</p>
        </div> 
    
    </>
  )
}
