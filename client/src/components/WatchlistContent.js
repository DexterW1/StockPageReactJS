import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import '../styles/WatchlistContent.css'
import DropdownButton from './DropdownButton'
import Decimal from 'decimal.js'
import { endOfToday } from 'date-fns'
export default function WatchlistContent({watchlistData,setWatchlistData}) {
  const [filterVariable,setFilterVariable] = useState ('Name');
  const [filterDirection,setFilterDirection] = useState(0);
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
  function handleClearAll(){
    setWatchlistData([]);
    localStorage.clear();
  }
  useEffect(()=>{
    console.log(filterVariable);
    if(filterDirection===0){
      if(filterVariable==="Name"){
        const sortedData = [...watchlistData].sort((a,b)=>{
          return a.name.localeCompare(b.name);
        })
        setWatchlistData(sortedData);
      }
      else if(filterVariable==="Symbol"){
        const sortedData = [...watchlistData].sort((a,b)=>{
          return a.symbol.localeCompare(b.symbol);
        })
        setWatchlistData(sortedData);
      }
      else if(filterVariable==="Price"){
        console.log("entered price");
        const sortedData = [...watchlistData].sort((a,b)=>{
          return a.data.c - b.data.c;
        })
        console.log(sortedData);
        setWatchlistData(sortedData);
      }
      else if(filterVariable==="Day Change"){
        const sortedData = [...watchlistData].sort((a,b)=>{
          return b.data.d - a.data.d;
        })
        setWatchlistData(sortedData);
      }
      else{
        const sortedData = [...watchlistData].sort((a,b)=>{
          return b.data.dp - a.data.dp;
        })
        setWatchlistData(sortedData);
      }
    }
    else{
      if(filterVariable==="Name"){
        const sortedData = [...watchlistData].sort((a,b)=>{
          return b.name.localeCompare(a.name);
        })
        setWatchlistData(sortedData);
      }
      else if(filterVariable==="Symbol"){
        const sortedData = [...watchlistData].sort((a,b)=>{
          return b.symbol.localeCompare(a.symbol);
        })
        setWatchlistData(sortedData);
      }
      else if(filterVariable==="Price"){
        const sortedData = [...watchlistData].sort((a,b)=>{
          console.log(b.c,"   ",a.c);
          return b.data.c - a.data.c;
        })
        setWatchlistData(sortedData);
      }
      else if(filterVariable==="Day Change"){
        const sortedData = [...watchlistData].sort((a,b)=>{
          return a.data.d - b.data.d;
        })
        setWatchlistData(sortedData);
      }
      else{
        const sortedData = [...watchlistData].sort((a,b)=>{
          return a.data.dp - b.data.dp;
        })
        setWatchlistData(sortedData);
      }
    }
  },[filterVariable,filterDirection]);
  return (
    <>
        <div className="watchlist-header">
            <h2>Watchlist</h2>
            <DropdownButton setFilterDirection={setFilterDirection} setFilterVariable={setFilterVariable}/>
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
                  <th><button onClick= {()=>handleClearAll()}className='delete-all-btn'>Clear</button></th>
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
