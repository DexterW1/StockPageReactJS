import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import '../styles/WatchlistContent.css'
import DropdownButton from './DropdownButton'


export default function WatchlistContent({postSymbol}) {
  const [watchlistData,setWatchlistData]=useState([]);
  const isInitialMount = useRef(true);
  function handleDeleteRow(symbol){
    const updatedList= watchlistData.filter((item)=> item.symbol!==symbol);
    setWatchlistData(updatedList);
  }
  useEffect(()=>{
    const symbol = postSymbol;
    console.log(symbol,"symbol entered");
    if(!isInitialMount.current){
      if(symbol !=='' && !watchlistData.some(item => item.symbol === symbol)){
        axios.post('/api/postsymbol/sendsymbol',{symbol})
          .then((res)=>{
            console.log(res.data)
            setWatchlistData((prevResults) => [...prevResults, res.data]);
          }).catch((error)=>{console.log(error);})
      }
    }
    else{
      isInitialMount.current=false;
    }
  },[postSymbol]);
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
                    <td>{item.data.c}</td>
                    <td>{item.data.d}</td>
                    <td>{item.data.dp}</td>
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
