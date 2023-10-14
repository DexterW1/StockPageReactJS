import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import '../styles/WatchlistContent.css'
import DropdownButton from './DropdownButton'
import Decimal from 'decimal.js'
export default function WatchlistContent({watchlistData,setWatchlistData}) {
  // const [watchlistData,setWatchlistData]=useState([]);
  // const isInitialMount = useRef(true);
  function handleDeleteRow(symbol){
    const updatedList= watchlistData.filter((item)=> item.symbol!==symbol);
    setWatchlistData(updatedList);
    saveDataToLocalStorage(updatedList);
  }
  function handleRound(number){
    const originalNumber = new Decimal(number)
    return originalNumber.toDecimalPlaces(2).toNumber();
  }
  function saveDataToLocalStorage(data){
    localStorage.setItem('watchlistdata',JSON.stringify(data));
  }
  return (
    <>
        <div className="watchlist-header">
            <h2>Watchlist</h2>
            <DropdownButton/>
        </div>
        <div className="userwatchlist-container">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                {watchlistData.map((item)=>(
                  <tr key={item.symbol}>
                    <td>{item.symbol}</td>
                    <td>{item.name}</td>
                    <td>${item.data.c}</td>
                    <td className={item.data.color === 1 ? 'colorred' : 'colorgreen'}>{item.data.d}</td>
                    <td className={item.data.color === 1 ? 'colorred' : 'colorgreen'}>{handleRound(item.data.dp)}%</td>
                    <td><button className='btn' onClick={()=>handleDeleteRow(item.symbol)}><ion-icon name="close-circle-outline"></ion-icon></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


    </>
  )
}
