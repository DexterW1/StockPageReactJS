import React from 'react'
import '../styles/WatchlistContent.css'
import DropdownButton from './DropdownButton'
export default function WatchlistContent() {
  return (
    <>
        <div className="watchlist-header">
            <h2>Watchlist</h2>
            <DropdownButton/>
        </div>


    </>
  )
}
