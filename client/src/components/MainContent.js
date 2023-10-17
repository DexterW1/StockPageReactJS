import React,{useEffect,useState} from 'react'
import '../styles/MainContent.css'
import GraphCard from './GraphCard'
import DashboardCard from './DashboardCard';
import NewsCard from './NewsCard';
import axios from 'axios';
import WatchlistContent from './WatchlistContent';

export default function MainContent({watchlistData,setWatchlistData}) {
  const[activeButton,setactiveButton]=useState('dashboard');  
  const[info,setInfo]=useState([]);
  // New Dashboard
  const[stockYahoo1,setStockYahoo1]=useState([]);
  const[stockYahoo2,setStockYahoo2]=useState([]);
  const[stockYahoo3,setStockYahoo3]=useState([]);
  const[symData1,setSymData1]=useState([]);
  const[symData2,setSymData2]=useState([]);
  const[symData3,setSymData3]=useState([]);
  useEffect(()=>{
    axios.get('/api/market-news').then((response) => {
        setInfo(response.data);
    });
    axios.get('/api/trending').then((res)=>{
        setStockYahoo1(res.data['^DJI']);
        setStockYahoo2(res.data['^IXIC']);
        setStockYahoo3(res.data['^GSPC']);
    })
    axios.get('/api/quote').then((res)=>{
        res.data.forEach((obj)=>{
            if(obj.item==="TSLA"){
                setSymData1(obj.data);
            }
            else if(obj.item==="AAPL"){
                setSymData2(obj.data);
            }
            else{
                setSymData3(obj.data);
            }
        });
    });
  },[]);
  return (
    <>
        <div className="main-container">
            <div className="left-side-menu">
                <div className="nav-container">
                    
                    <button id="dashboard" onClick={()=>{setactiveButton('dashboard')}}>
                        <img className='leftIcons' src="./images/home-white.png" alt="home-icon" />
                    </button>
                    <button id="Graph" onClick={()=>{setactiveButton('graph')}}>
                        <img className='leftIcons' id='graph-icon' src="./images/bar-chart-white.png" alt="graph-icon" /> 
                    </button>
                    <button id="watchlist" onClick={()=>{setactiveButton('watchlist')}}>
                        <img className='leftIcons' src="./images/file-white.png" alt="watchlist-icon" />
                    </button>
                    
                </div>
            </div>
            <div className="main-content">
                {activeButton==='dashboard'&&(
                    <>
                        <div className="dashboard-card-container">
                            <DashboardCard stockName='Dow Jones' Data={stockYahoo1} tickerSym={symData1}/>
                            <DashboardCard stockName='NASDAQ' Data={stockYahoo2} tickerSym={symData2}/>
                            <DashboardCard stockName='S&P 500' Data={stockYahoo3} tickerSym={symData3}/>
                        </div>
                        <div className="news-header">
                            <h2>News</h2>
                        </div>
                        <div className='news-container'>
                            <NewsCard info={info} />
                        </div>
                    </>
                )}
                {activeButton==='graph' && (
                    <div className="graph-container">
                        <div className="graph-card">
                            <GraphCard/>
                        </div>
                    </div>
                )}
                {activeButton==='watchlist'&&(
                    <div className="watchlist-card">
                        <WatchlistContent setWatchlistData={setWatchlistData} watchlistData ={watchlistData} />
                    </div>
                )}
            </div>
            <div className="right-side-menu">
                <div className="right-card">
                    <div className="dowjones-card">
                        <h3>Dow Jones</h3>
                    </div>
                </div>
                <div className="right-card">
                    <div className="nasdaq-card">
                        <h3>NASDAQ</h3>
                    </div>
                </div>
                <div className="right-card">
                    <div className="sp500-card">
                        <h3>S&P 500</h3>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}
//<div> Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy"> Dave Gandy </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>