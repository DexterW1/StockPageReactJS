import React,{useState} from 'react';
import './styles/App.css';
import './variable.css';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
function App() {
  const [watchlistData,setWatchlistData]=useState([]);
  return (
    <>
      <div className="top-bar">
        <TopBar watchlistData={watchlistData} setWatchlistData={setWatchlistData} />
      </div>
      <div className="main-content">
        <MainContent watchlistData={watchlistData} setWatchlistData={setWatchlistData}/>
      </div>
    </>
  );
}

export default App;
