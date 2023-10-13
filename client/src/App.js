import React,{useState} from 'react';
import './styles/App.css';
import './variable.css';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
function App() {
  const [stockSymbol,setStockSymbol]=useState('');
  const [watchlistData,setWatchlistData]=useState([]);
  return (
    <>
      <div className="top-bar">
        <TopBar onSearch={setStockSymbol}/>
        {/* <TopBar onSearch={setWatchlistData}/> */}
      </div>
      <div className="main-content">
        <MainContent stockSymbol={stockSymbol}/>
      </div>
    </>
  );
}

export default App;
