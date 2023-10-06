import React,{useEffect,useState} from 'react'
import '../styles/MainContent.css'
import GraphCard from './GraphCard'
import DashboardCard from './DashboardCard';
import NewsCard from './NewsCard';
import ChartCard from './ChartCard';
const finKey = process.env.REACT_APP_API_KEY;
function getTodayTimeUnix() {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset(); // Get UTC offset in minutes
    const pdtOffset = 7 * 60; // PDT (Pacific Daylight Time) UTC offset is -7 hours
    const startOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      6 + pdtOffset / 60, // 6:30 AM PDT
      30 + pdtOffset % 60,
      0
    );
    const endOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      13 + pdtOffset / 60, // 1:00 PM PDT
      0 + pdtOffset % 60,
      0
    );
    const startOfDayUTC = new Date(
      startOfDayPDT.getTime() - utcOffset * 60000
    ).getTime();
    const endOfDayUTC = new Date(
      endOfDayPDT.getTime() - utcOffset * 60000
    ).getTime();
    return { start:startOfDayUTC, end:endOfDayUTC };
  }

export default function MainContent() {
  const[activeButton,setactiveButton]=useState('dashboard');  
  const[info,setInfo]=useState([]);
  const[nasdaq,setNasdaq]=useState([]);
  const[dowjones,setDowjones]=useState([]);
  const[sp,setSp]=useState([]);
  useEffect(()=>{
    const {start,end} = getTodayTimeUnix();
    const finnhub = require('finnhub');
    console.log("STARTUNIX:",start);
    console.log("ENDUNIX:",end);
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = finKey;
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.marketNews("general", {}, (error, data, response) => {
        setInfo(data.slice(0,10));
    });
    finnhubClient.stockCandles("COMP", "5", start/1000,end/1000, (error, data, response) => {
        setNasdaq(data)
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
                            <DashboardCard stockName='Tesla'/>
                            <DashboardCard stockName='Apple'/>
                            <DashboardCard stockName='Google'/>
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
                        <ChartCard SymbolData={nasdaq}/>
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