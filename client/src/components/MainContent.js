import React,{useEffect,useState} from 'react'
import '../styles/MainContent.css'
import GraphCard from './GraphCard'
import DashboardCard from './DashboardCard';
import NewsCard from './NewsCard';
import axios from 'axios';
import WatchlistContent from './WatchlistContent';

export default function MainContent() {
  const[activeButton,setactiveButton]=useState('dashboard');  
  const[info,setInfo]=useState([]);
  const[stock1,setStock1]=useState([]);
  const[stock2,setStock2]=useState([]);
  const[stock3,setStock3]=useState([]);
  const[symData1,setSymData1]=useState([]);
  const[symData2,setSymData2]=useState([]);
  const[symData3,setSymData3]=useState([]);
  useEffect(()=>{
    axios.get('/api/market-news').then((response) => {
        setInfo(response.data);
    });
    axios.get('/api/stock-candles').then((res)=>{
        res.data.forEach((obj)=>{
            if(obj.symbol==="TSLA"){
                setStock1(obj.data);
            }
            else if(obj.symbol==='AAPL'){
                setStock2(obj.data);
            }
            else{
                setStock3(obj.data);
            }
        });
    });
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
                            <DashboardCard stockName='Tesla' Data={stock1} tickerSym={symData1}/>
                            <DashboardCard stockName='Apple' Data={stock2} tickerSym={symData2}/>
                            <DashboardCard stockName='Google' Data={stock3} tickerSym={symData3}/>
                        </div>
                        <div className="news-header">
                            <h2>News</h2>
                        </div>
                        <div className='news-container'>
                            <NewsCard info={info} />
                        </div>
                    </>
                )}
                <div className="graph-container">
                    {activeButton==='graph' && (
                        <div className="graph-card">
                            <GraphCard/>
                        </div>
                    )}
                </div>
                {activeButton==='watchlist'&&(
                    <div className="watchlist-card">
                        <WatchlistContent/>
                    </div>
                )}
            </div>
            <div className="right-side-menu">
                <div className="right-card">
                    <div className="dowjones-card">
                        <h1>Dow Jones</h1>
                    </div>
                </div>
                <div className="right-card">
                    <div className="nasdaq-card">
                        <h1>NASDAQ</h1>
                    </div>
                </div>
                <div className="right-card">
                    <div className="sp500-card">
                        <h1>S&P 500</h1>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}
//<div> Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy"> Dave Gandy </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>