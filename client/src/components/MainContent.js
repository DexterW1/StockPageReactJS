import React,{useEffect,useState} from 'react'
import '../styles/MainContent.css'
import GraphCard from './GraphCard'
import DashboardCard from './DashboardCard';
import NewsCard from './NewsCard';
import getTodayTimeUnix from '../helperfunctions/helperfunction.js'
import axios from 'axios';
const finKey = process.env.REACT_APP_API_KEY;

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
    const {start,end} = getTodayTimeUnix();
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = finKey;
    const finnhubClient = new finnhub.DefaultApi()
    axios.get('/api/market-news').then((response) => {
        setInfo(response.data);
    });
    // finnhubClient.marketNews("general", {}, (error, data, response) => {
    //     setInfo(data.slice(0,10));
    // });
    axios.get('/api/stock-candles').then((res)=>{
        res.data.forEach((obj)=>{
            if(obj.symbol=="TSLA"){
                setStock1(obj.data);
                console.log(obj.data);
            }
            else if(obj.symbol=='AAPL'){
                setStock2(obj.data);
            }
            else{
                setStock3(obj.data);
            }
        });
    });
    // finnhubClient.stockCandles("TSLA", "5", start/1000,end/1000, (error, data, response) => {
    //     setStock1(data);
    // });
    // finnhubClient.stockCandles("AAPL", "5", start/1000,end/1000, (error, data, response) => {
    //     setStock2(data);
    // });
    // finnhubClient.stockCandles("GOOGL", "5", start/1000,end/1000, (error, data, response) => {
    //     setStock3(data);
    // });
    finnhubClient.quote("TSLA", (error, data, response) => {
        setSymData1(data);
    });
    finnhubClient.quote("AAPL", (error, data, response) => {
        setSymData2(data);
    });
    finnhubClient.quote("GOOGL", (error, data, response) => {
        setSymData3(data);
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