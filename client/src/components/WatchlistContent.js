import React,{useState} from 'react'
import '../styles/WatchlistContent.css'
import DropdownButton from './DropdownButton'
export default function WatchlistContent({postSymbol}) {
  
  return (
    <>
        <div className="watchlist-header">
            <h2>Watchlist</h2>
            <DropdownButton/>
        </div>
        <div className="userwatchlist-container">
          <p>{postSymbol}</p>
        </div>


    </>
  )
}
